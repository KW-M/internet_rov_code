package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"

	"log"

	// "flag"
	"fmt"

	// "strconv"
	// "os"
	// "os/signal"
	// "sync"

	"time"

	peerjs "github.com/KW-M/peerjs-go"
	// webrtc "github.com/pion/webrtc/v3"
)

var err error

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

	rovWebsocketPeer, _ := peerjs.NewPeer("SROV", peerjsOpts)
	defer rovWebsocketPeer.Close() // close the websocket connection when this whole outer function exits

	rovWebsocketPeer.On("connection", func(data interface{}) {
		pilotDataConnection := data.(*peerjs.DataConnection)
		time.Sleep(time.Second * 1)

		var pilotPeerId string = pilotDataConnection.GetPeerID()
		fmt.Printf("Calling Pilot Peer ID: %s\n", pilotPeerId)
		_, err = rovWebsocketPeer.Call(pilotPeerId, rovLivestreamVideoTrack, peerjs.NewConnectionOptions())
		if err != nil {
			log.Println("Error calling pilot id: ", pilotPeerId)
			log.Fatal(err)
		}

		pilotDataConnection.On("data", func(data interface{}) {
			// Will print 'hi!'
			log.Printf("Received: %#v: %s\n", data, data)
		})

		pilotDataConnection.On("close", func(message interface{}) {
			println("PILOT PEER JS CLOSE EVENT", message)
		})

		pilotDataConnection.On("disconnected", func(message interface{}) {
			println("PILOT PEER JS DISCONNECTED EVENT", message)
		})

		pilotDataConnection.On("error", func(message interface{}) {
			fmt.Printf("PILOT PEER JS ERROR EVENT: %s", message)
		})

		for {
			pilotDataConnection.Send([]byte("hi!"), false)
			<-time.After(time.Millisecond * 1000)
			if shouldEndProgram := <-done; shouldEndProgram { // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
				return
			}
		}
	})

	rovWebsocketPeer.On("close", func(message interface{}) {
		println("ROV PEER JS CLOSE EVENT", message)
	})

	rovWebsocketPeer.On("disconnected", func(message interface{}) {
		println("ROV PEER JS DISCONNECTED EVENT", message)
		// println("reconnecting peer...")

	})

	rovWebsocketPeer.On("error", func(message interface{}) {
		fmt.Printf("ROV PEER JS ERROR EVENT: %s", message)
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
