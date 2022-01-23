package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"
	"io"
	"log"
	"os"

	// "flag"
	"fmt"

	// "strconv"
	// "os"
	// "os/signal"
	// "sync"
	"os/exec"
	"time"

	peerjs "github.com/KW-M/peerjs-go"
	webrtc "github.com/pion/webrtc/v3"
	"github.com/pion/webrtc/v3/pkg/media"
	"github.com/pion/webrtc/v3/pkg/media/h264reader"
)

const (
	h264FrameDuration = time.Millisecond * 33
)

var (
	videoTrack = &webrtc.TrackLocalStaticSample{}
)

func pipeVideoToStream(done chan bool) error {
	// Startup libcamera-vid command to get the video data from the camera exposed (locally) on a http/tcp port
	cmd := exec.Command("libcamera-vid", "--width", "640", "--height", "480", "--framerate", "20", "--bitrate", "8000000", "--codec", "h264", "--inline", "1", "--flush", "1", "--timeout", "0","--output", "-") //"--listen", "1", "--output", "tcp://0.0.0.0:8585")
	fmt.Println(cmd.Args)

	dataPipe, err := cmd.StdoutPipe()
	if err != nil {
		log.Fatal("could not create named pipe. ", err)
	}

	if err := cmd.Start(); err != nil {
		return err
	}

	fmt.Println("Waiting for libcamera-vid to start")
	cmdOuputBufferArray := make([]byte, 600000)
	//
	for i := 0; i < 50; i++ {
		_, err := dataPipe.Read(cmdOuputBufferArray)
		if err != nil {
			log.Println("Could not read libcamera-vid command ouput pipe: ", err)
		} else {
			log.Print(cmdOuputBufferArray)
		}
		time.Sleep(time.Millisecond * 50)
	}




	// framebuffer := make(chan []byte, 60)

	h264, h264Err := h264reader.NewReader(dataPipe)
	if h264Err != nil {
		log.Println("h264reader Error")
		panic(h264Err)
	}

	go func() {
		// Send our video a frame at a time. Pace our sending so we send it at the same speed it should be played back as.
		// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
		//
		// It is important to use a time.Ticker instead of time.Sleep because
		// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
		// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)
		spsAndPpsCache := []byte{}
		ticker := time.NewTicker(h264FrameDuration)
		for ; true; <-ticker.C {
			nal, h264Err := h264.NextNAL()
			if h264Err == io.EOF {
				fmt.Printf("All video frames parsed and sent")
				os.Exit(0)
			}
			if h264Err != nil {
				panic(h264Err)
			}

			nal.Data = append([]byte{0x00, 0x00, 0x00, 0x01}, nal.Data...)

			if nal.UnitType == h264reader.NalUnitTypeSPS || nal.UnitType == h264reader.NalUnitTypePPS {
				spsAndPpsCache = append(spsAndPpsCache, nal.Data...)
				continue
			} else if nal.UnitType == h264reader.NalUnitTypeCodedSliceIdr {
				nal.Data = append(spsAndPpsCache, nal.Data...)
				spsAndPpsCache = []byte{}
			}

			if h264WriteErr := videoTrack.WriteSample(media.Sample{Data: nal.Data, Duration: time.Second}); h264WriteErr != nil {
				log.Println("Error writing h264 video track sample: ", h264WriteErr)
				// panic(h264WriteErr)

			}
		}
	}()
	// continuously read from the tcp connection and write the video data to the framebuffer variable in a separate goroutine
	// go func() {
	// 	for {
	// 		select {
	// 		case <-done: // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
	// 			return
	// 		default:
	// 			framebytes := make([]byte, 600000)
	// 			// n, err := dataPipe.Read(framebytes)
	// 			// if err != nil {
	// 			// 	log.Println("could not read pipe. ", err)
	// 			// }

	// 			nread, err := conn.Read(framebytes)
	// 			if err != nil {
	// 				fmt.Printf("failed to read from socket: %s\n", err)
	// 				return
	// 			}
	// 			// fmt.Printf("bytes read: %d\n", nread)

	// 			framebuffer <- framebytes[:nread]
	// 		}
	// 	}
	// }()

	// // continuously sample video data from framebuffer (if present) and write it to the webrtc track in a separate goroutine
	// go func() {
	// 	for {
	// 		select {
	// 		case <-done: // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
	// 			if err := cmd.Process.Signal(syscall.SIGTERM); err != nil {
	// 				log.Println("Failed to kill camera process. ", err)
	// 			}
	// 			return
	// 		case frame := <-framebuffer: // if new data is in the framebuffer, grab it, (delete from buffer?), and use it in the media sample

	// 			if err := videoTrack.WriteSample(media.Sample{Data: frame, Duration: time.Second}); err != nil {
	// 				log.Fatal("could not write rtp sample. ", err)
	// 				return
	// 			}
	// 		}
	// 	}
	// }()

	return nil
}

func setupWebrtcConnection(done chan bool) {

	// setup peerjs-go
	peerjsOpts := peerjs.NewOptions()
	peerjsOpts.Debug = 3

	// FOR CLOUD HOSTED PEERJS SERVER:
	peerjsOpts.Host = "0.peerjs.com"
	peerjsOpts.Port = 443
	peerjsOpts.Secure = true
	peerjsOpts.Path = "/"

	// FOR LOCAL PEERJS SERVER:
	// peerjsOpts.Host = "raspberrypi.local"
	// peerjsOpts.Port = 9000
	// peerjsOpts.Path = "/"
	// peerjsOpts.Secure = false

	// peerjsOpts.reliable = true // < this option may change from "reliable" to "ordered" in a future version

	// peerjsOpts.Key = "peerjs"

	// Create the video track for the video stream data to go in.
	var err error
	videoTrack, err = webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: "video/h264"}, "rov-front-cam", "rov-front-cam-stream")
	if err != nil {
		log.Fatal(err)
	}
	pipeVideoToStream(done)

	rovWebsocketPeer, _ := peerjs.NewPeer("SROV", peerjsOpts)
	defer rovWebsocketPeer.Close() // close the websocket connection when this whole outer function exits

	rovWebsocketPeer.On("connection", func(data interface{}) {
		pilotDataConnection := data.(*peerjs.DataConnection)
		time.Sleep(time.Second * 1)

		var pilotPeerId string = pilotDataConnection.GetPeerID()
		fmt.Printf("Calling Pilot Peer ID: %s\n", pilotPeerId)
		_, err = rovWebsocketPeer.Call(pilotPeerId, videoTrack, peerjs.NewConnectionOptions())
		if err != nil {
			log.Println("Error calling pilot id: ", pilotPeerId)
			log.Fatal(err)
		}



		// pilotDataConnection.On("data", func(data interface{}) {
		// 	// Will print 'hi!'
		// 	log.Printf("Received: %#v: %s\n", data, data)
		// })

		// for {
		// 	pilotDataConnection.Send([]byte("hi!"), false)
		// 	<-time.After(time.Millisecond * 1000)
		// 	// if shouldEndProgram := <-done; shouldEndProgram { // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
		// 	// 	return
		// 	// }
		// }
	})

	// func newAnswerOptions() *peerjs.AnswerOption {
	// 	return &peerjs.AnswerOption{}
	// }

	// rovWebsocketPeer.On("call", func(mediaConn interface{}) {
	// 	mediaConnection := mediaConn.(*peerjs.MediaConnection)
	// 	log.Println("Got Call!")

	// 	var err error
	// 	videoTrack, err = webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: "video/h264"}, "rov-front-cam", "rov-front-cam-stream")
	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}
	// 	log.Println("Answering call")
	// 	mediaConnection.Answer(videoTrack,newAnswerOptions());
	// 	// if err != nil {
	// 	// 	log.Println("error answering SPilot")
	// 	// 	log.Fatal(err)
	// 	// }

	// 	// pipeVideoToStream(done)

	// })

	// ---------------------------------------------------------------------------------------------------------------------
	// peer1, _ := peerjs.NewPeer("peer1", peerjsOpts)
	// defer peer1.Close()

	// peer2, _ := peerjs.NewPeer("peer2", peerjsOpts)
	// defer peer2.Close()

	// peer2.On("connection", func(data interface{}) {
	// 	conn2 := data.(*peerjs.DataConnection)
	// 	conn2.On("data", func(data interface{}) {
	// 		// Will print 'hi!'
	// 		log.Printf("Receuuuived: %#v: %s\n", data, data)
	// 	})
	// })

	// conn1, _ := peer1.Connect("peer2", nil)
	// conn1.On("open", func(data interface{}) {
	// 	for {
	// 		conn1.Send([]byte("huuui!"), false)
	// 		<-time.After(time.Millisecond * 1000)
	// 	}
	// })
	// ---------------------------------------------------------------------------------------------------------------------
	for { // endless loop to keep the program running
		if shouldEndProgram := <-done; shouldEndProgram { // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
			return
		}
	}
}


	// // connect to site
	// conn, err := net.Dial("tcp", "127.0.0.1:8585")
	// if err != nil {
	// 	fmt.Printf("failed to connect to video tcp: %s\n", err)
	// 	return err
	// }

// func handleMediaCall(remoteSDP) {
// 	mediaEngine := webrtc.MediaEngine{}
// 	if err := mediaEngine.PopulateFromSDP(remoteSdp); err != nil {
// 		fmt.Println("pion could not create webrtc media engine from remote SDP.", err)
// 		return
// 	}

// 	// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264

// 	// Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// 	var h264PayloadType uint8 = 0
// 	for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 		if videoCodec.Name == "H264" {
// 			h264PayloadType = videoCodec.PayloadType
// 			break
// 		}
// 	}

// 	// if the payloadTypeNumber never changed, the broswer doesn't support H264 (highly unlikely)
// 	if h264PayloadType == 0 {
// 		fmt.Println("Remote peer does not support H264")
// 		continue
// 	}

// 	fmt.Println("received offer")
// 	peerConnection, err := c.NewPeerConnection(mediaEngine)
// 	if err != nil {
// 		fmt.Println(err)
// 		continue
// 	}
// }

// func runCommand(cmd string, args ...string) (string, error) {
// 	cmdOut, err := exec.Command(cmd, args...)


// }