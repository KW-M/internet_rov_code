package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"
	"bufio"
	"io"
	"log"

	// "flag"
	"fmt"

	// "strconv"
	// "os"
	// "os/signal"
	// "sync"
	"os/exec"
	"time"

	webrtc "github.com/pion/webrtc/v3"
	"github.com/pion/webrtc/v3/pkg/media"
	"github.com/pion/webrtc/v3/pkg/media/h264reader"
)

const (
	h264FrameDuration = time.Millisecond * 33
)

// videoTrack to hold the front camera video stream for all peers/pilots who connect
var rovLivestreamVideoTrack = &webrtc.TrackLocalStaticSample{}

// Create the video track for the video stream data to go in.
func initVideoTrack() *webrtc.TrackLocalStaticSample {
	// Create the video track
	var err error
	rovLivestreamVideoTrack, err = webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: "video/h264"}, "rov-front-cam", "rov-front-cam-stream")
	if err != nil {
		log.Fatal("could not create video track. ", err)
	}

	return rovLivestreamVideoTrack
}

func pipeVideoToStream(done chan bool) error {
	// Startup libcamera-vid command to get the video data from the camera exposed (locally) on a http/tcp port
	//  "--profile", "baseline", "--level", "4","--bitrate", "8000000",
	cmd := exec.Command("libcamera-vid", "--width", "640", "--height", "480", "--framerate", "20", "--codec", "h264", "--inline", "1", "--flush", "1", "--timeout", "0","--nopreview", "1","--output", "-") //"--listen", "1", "--output", "tcp://0.0.0.0:8585")
	fmt.Println(cmd.Args)

	sdoutPipe, err := cmd.StdoutPipe()
	sderrPipe, err := cmd.StderrPipe()
	if err != nil {
		log.Fatal("could not create libcamera-vid cmd output pipes. ", err)
	}

	// print out the stderr output of the command in a seperate go routine
	go func() {
		scanner := bufio.NewScanner(sderrPipe)
		scanner.Split(bufio.ScanLines)
		for scanner.Scan() {
			fmt.Printf("[libcamera-vid][ERROR] > %s\n", scanner.Text())
		}
	}()

	// Create a new video track from the h264 reader
	if err := cmd.Start(); err != nil {
		fmt.Printf("[libcamera-vid][CMD START ERROR] > %s\n", err)
		return err
	}

	// print out the stdout output of the command until a Long line of text is found, indicating that the video data has started flowing (most likely)
	scanner := bufio.NewScanner(sdoutPipe)
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) > 100 {
			break
		}
		fmt.Printf("[libcamera-vid] > %s\n", line)
	}

	// Now attach the h264 reader to the output of the libcamera-vid command
	h264, h264Err := h264reader.NewReader(sdoutPipe)
	if h264Err != nil {
		log.Println("h264reader Initilization Error")
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
		for ;true; <-ticker.C {
			nal, h264Err := h264.NextNAL()
			if h264Err == io.EOF {
				fmt.Printf("SHOULD NOT HAPPEN! All video frames parsed and sent")
			}
			if h264Err != nil {
				log.Println("h264reader Decode Error: ",h264Err)
				continue
			}
			nal.Data = append([]byte{0x00, 0x00, 0x00, 0x01}, nal.Data...)

			if nal.UnitType == h264reader.NalUnitTypeSPS || nal.UnitType == h264reader.NalUnitTypePPS {
				spsAndPpsCache = append(spsAndPpsCache, nal.Data...)
				continue
			} else if nal.UnitType == h264reader.NalUnitTypeCodedSliceIdr {
				nal.Data = append(spsAndPpsCache, nal.Data...)
				spsAndPpsCache = []byte{}
			}

			if h264WriteErr := rovLivestreamVideoTrack.WriteSample(media.Sample{Data: nal.Data, Duration: time.Second}); h264WriteErr != nil {
				log.Println("Error writing h264 video track sample: ", h264WriteErr)
			}
		}
	}()

	return nil
}