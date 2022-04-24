package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"

	"io"
	"os"

	// "flag"

	// "strconv"
	// "os"
	// "os/signal"
	// "sync"

	"time"

	webrtc "github.com/pion/webrtc/v3"
	"github.com/pion/webrtc/v3/pkg/media"
	"github.com/pion/webrtc/v3/pkg/media/h264reader"
	log "github.com/sirupsen/logrus"
)

const (
	h264FrameDuration = time.Millisecond * 33
)

// setup logrus logger
var cameraLog = log.WithFields(log.Fields{})

// videoTrack to hold the front camera video stream for all peers/pilots who connect
var cameraLivestreamVideoTrack = &webrtc.TrackLocalStaticSample{}

// Create the video track for the video stream data to go in.
func initVideoTrack() *webrtc.TrackLocalStaticSample {
	// Create the video track
	var err error
	cameraLivestreamVideoTrack, err = webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: "video/h264"}, "rov-front-cam", "rov-front-cam-stream")
	if err != nil {
		log.Fatal("could not create video track. ", err)
	}

	return cameraLivestreamVideoTrack
}

func pipeVideoToStream(programShouldQuitSignal *UnblockSignal) error {
	// Startup libcamera-vid command to get the video data from the camera exposed (locally) on a http/tcp port
	//960x720
	//"--width", "640", "--height", "480",
	// "libcamera-vid", "--width", "960", "--height", "720", "--codec", "h264", "--profile", "high", "--level", "4.2","--bitrate", "800000",  "--framerate", "16", "--inline", "1", "--flush", "1", "--timeout", "0","--nopreview", "1","--output", "-"
	// https://trac.ffmpeg.org/wiki/StreamingGuide#Latency
	// https://ffmpeg.org/ffmpeg-bitstream-filters.html#toc-h264_005fmp4toannexb "-bsf:v", "h264_mp4toannexb",
	// https://gist.github.com/tayvano/6e2d456a9897f55025e25035478a3a50
	//"ffmpeg", "-f", "avfoundation", "-pix_fmt", "nv12", "-framerate", "30", "-use_wallclock_as_timestamps", "1", "-i", "default", "-preset", "ultrafast", "-vcodec", "libx264", "-tune", "zerolatency", "-b:v", "900k", "-flags", "low_delay", "-max_delay", "0", "-bf", "0", "-f", "h264", "pipe:1")
	//
	//"-preset", "ultrafast", "-tune", "zerolatency", "-b:v", "900k", "-flags", "low_delay", "-max_delay", "0", "-bf", "0",

	// cmd := exec.Command("cat", "/Users/ky/Downloads/webrtc-relay/vido.pipe")
	// fmt.Println(cmd.Args)

	// sdoutPipe, _ := cmd.StdoutPipe()
	// sderrPipe, err := cmd.StderrPipe()
	// if err != nil {
	// 	cameraLog.Fatal("could not create video stream cmd output pipes. ", err)
	// }

	// // print out the stderr output of the command in a seperate go routine
	// go func() {
	// 	scanner := bufio.NewScanner(sderrPipe)
	// 	scanner.Split(bufio.ScanLines)
	// 	for scanner.Scan() {
	// 		cameraLog.Printf("[camera-stream-sderr] > %s\n", scanner.Text())
	// 	}
	// }()

	// // Create a new video track from the h264 reader
	// if err := cmd.Start(); err != nil {
	// 	cameraLog.Printf("[camera-stream-cmd][CMD START ERROR] > %s\n", err)
	// 	return err
	// }

	// print out the stdout output of the command until a Long line of text is found, indicating that the video data has started flowing (most likely)
	// scanner := bufio.NewScanner(sdoutPipe)
	// scanner.Split(bufio.ScanLines)
	// for scanner.Scan() {
	// 	line := scanner.Text()
	// 	if len(line) > 100 {
	// 		break
	// 	}
	// 	fmt.Printf("[libcamera-vid] > %s\n", line)
	// }

	stdoutPipe, err := os.OpenFile(config.NamedPipeFolder+"vid.pipe", os.O_RDWR, os.ModeNamedPipe|0666)
	if err != nil {
		log.Error("Error opening named pipe:", err)
		return nil
	}
	// Now attach the h264 reader to the output of the camera-streaming command
	h264, h264Err := h264reader.NewReader(stdoutPipe)
	if h264Err != nil {
		cameraLog.Println("h264reader Initilization Error")
		panic(h264Err)
	}

	go func() {
		// from https://github.com/ashellunts/ffmpeg-to-webrtc/blob/master/src/main.go
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
				cameraLog.Println("All video frames parsed and sent")
				return
			}
			if h264Err != nil {
				cameraLog.Println("h264reader Decode Error: ", h264Err)
				return
			}
			nal.Data = append([]byte{0x00, 0x00, 0x00, 0x01}, nal.Data...)

			if nal.UnitType == h264reader.NalUnitTypeSPS || nal.UnitType == h264reader.NalUnitTypePPS {
				spsAndPpsCache = append(spsAndPpsCache, nal.Data...)
				continue
			} else if nal.UnitType == h264reader.NalUnitTypeCodedSliceIdr {
				nal.Data = append(spsAndPpsCache, nal.Data...)
				spsAndPpsCache = []byte{}
			}

			if h264WriteErr := cameraLivestreamVideoTrack.WriteSample(media.Sample{Data: nal.Data, Duration: time.Second}); h264WriteErr != nil {
				cameraLog.Println("Error writing h264 video track sample: ", h264WriteErr)
			}
		}
	}()

	return nil
}
