package main

import (
	"errors"
	"os"
	"syscall"
	"time"

	// "os"

	webrtc "github.com/pion/webrtc/v3"
	log "github.com/sirupsen/logrus"
)

type NamedPipeMediaSource struct {
	pipeFile           *os.File
	pipeFilePath       string
	exitReadLoopSignal *UnblockSignal
	WebrtcTrack        *webrtc.TrackLocalStaticSample
	readBufferSize     int
	log                *log.Entry
}

func CreateNamedPipeMediaSource(pipeFilePath string, readBufferSize int, mediaMimeType string, trackName string) (*NamedPipeMediaSource, error) {
	var pipe = NamedPipeMediaSource{
		pipeFile:           nil,
		pipeFilePath:       pipeFilePath,
		exitReadLoopSignal: newUnblockSignal(),
		readBufferSize:     readBufferSize,
		log:                log.WithField("media_pipe", pipeFilePath),
	}

	track, err := webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: mediaMimeType}, trackName, trackName+"_stream")
	if err != nil {
		pipe.log.Error("Failed to create webrtc track: ", err)
		return nil, err
	}
	pipe.WebrtcTrack = track

	// attempt to create the pipe file if doesn't already exist:
	if _, err := os.Stat(pipeFilePath); err != nil {
		err := syscall.Mkfifo(pipeFilePath, 0666)
		if err != nil {
			pipe.log.Error("Make named pipe file error:", err)
			return nil, err
		}
	}

	return &pipe, nil
}

func (pipe *NamedPipeMediaSource) Close() {
	pipe.log.Print("Closing pipe file")
	if pipe.pipeFile != nil {
		pipe.exitReadLoopSignal.Trigger()
		pipe.pipeFile.Close()
	}
}

//https://stackoverflow.com/questions/41739837/all-mime-types-supported-by-mediarecorder-in-firefox-and-chrome
func (pipe *NamedPipeMediaSource) startMediaStream(exitSignal *UnblockSignal) error {
	defer pipe.Close()
	for {
		pipe.pipeFile, err = os.OpenFile(pipe.pipeFilePath, os.O_RDWR, os.ModeNamedPipe|0666)
		if err != nil {
			pipe.log.Error("Error opening media source named pipe:", err)
			<-time.After(time.Second)
			continue
		}

		mimeType := pipe.WebrtcTrack.Codec().MimeType
		if mimeType == "video/h264" {
			go read_h264(pipe)
		} else if mimeType == "video/x-ivf" || mimeType == "video/x-indeo" {
			go read_ivf(pipe)
		} else if mimeType == "audio/ogg" {
			go read_ogg(pipe)
		} else {
			return errors.New("Unsupported Media Source MimeType: " + mimeType)
		}

		select {
		case <-pipe.exitReadLoopSignal.GetSignal():
			<-time.After(time.Second)
			continue
		case <-exitSignal.GetSignal():
			pipe.log.Print("Exiting pipe loops...")
			pipe.exitReadLoopSignal.Trigger()
			return nil
		}
	}
}

// func (pipe *NamedPipeMediaStream) ReadDataLoop() {

// buffer := make([]byte, pipe.readBufferSize)
// defer pipe.log.Print("Exiting media pipe read loop...")
// for {
// 	if pipe.exitRWLoopsSignal.HasTriggered {
// 		return
// 	}

// 	if err := scanner.Err(); err != nil {
// 	if err != nil && err == io.EOF { // io.EOF means the pipe is closed
// 		pipe.log.Info("Pipe closed, exiting read loop...")
// 		return
// 	} else if err != nil {
// 		pipe.log.Printf("Error reading message from pipe: %v", err)
// 		continue
// 	}
// }
// }
