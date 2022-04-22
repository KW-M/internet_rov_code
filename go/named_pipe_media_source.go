package main

import (
	"os"
	"syscall"

	// "os"

	webrtc "github.com/pion/webrtc/v3"
	log "github.com/sirupsen/logrus"
)

type NamedPipeMediaSource struct {
	pipeFile          *os.File
	pipeFilePath      string
	exitRWLoopsSignal *UnblockSignal
	WebrtcTrack       *webrtc.TrackLocalStaticSample
	readBufferSize    int
	log               *log.Entry
}

func CreateNamedPipeMediaSource(pipeFilePath string, readBufferSize int, mediaMimeType string, trackName string) (*NamedPipeMediaSource, error) {
	var pipe = NamedPipeMediaSource{
		pipeFile:          nil,
		pipeFilePath:      pipeFilePath,
		exitRWLoopsSignal: newUnblockSignal(),
		readBufferSize:    readBufferSize,
		log:               log.WithField("media_pipe", pipeFilePath),
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

// func (pipe *NamedPipeMediaStream) PipeToStream() {

// }

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

// func (pipe *NamedPipeRelay) readMessagesLoop() {
// 	defer pipe.log.Print("Exiting read loop...")
// 	scanner := bufio.NewScanner(pipe.pipeFile)
// 	for scanner.Scan() {
// 		if pipe.exitRWLoopsSignal.HasTriggered {
// 			return
// 		} else if err := scanner.Err(); err != nil {
// 			pipe.log.Printf("Error reading message from pipe: %v", err)
// 			pipe.exitRWLoopsSignal.TriggerWithError(err)
// 			return
// 		}
// 		pipe.GetMessagesFromPipe <- scanner.Text()
// 	}
// }

// func (pipe *NamedPipeRelay) writeMessagesLoop() {
// 	// writer := bufio.NewWriter(pipe.pipeFile)
// 	defer pipe.log.Print("Exiting write loop...")
// 	for {
// 		select {
// 		case <-pipe.exitRWLoopsSignal.GetSignal():
// 			return
// 		case message := <-pipe.SendMessagesToPipe:
// 			log.Print("Writing message to pipe: ", message)
// 			// _, err := writer.WriteString(message + "\n")
// 			num, err := pipe.pipeFile.WriteString(message + "\n")
// 			log.Print("Num: ", num)
// 			if err != nil {
// 				pipe.log.Printf("Error writing message to pipe: %v", err)
// 				pipe.exitRWLoopsSignal.TriggerWithError(err)
// 				return
// 			}
// 		}
// 	}
// }

// func (pipe *NamedPipeRelay) Close() {
// 	pipe.log.Print("Closing pipe file")
// 	if pipe.pipeFile != nil {
// 		pipe.pipeFile.Close()
// 	}
// }

// func (pipe *NamedPipeRelay) runPipeLoops(exitSignal *UnblockSignal, readable bool, writeable bool) error {
// 	defer pipe.Close()
// 	for {
// 		pipeFile, err := os.OpenFile(pipe.pipeFilePath, os.O_RDWR, os.ModeNamedPipe|0666)
// 		if err != nil {
// 			pipe.log.Error("Error opening named pipe:", err)
// 			<-time.After(time.Second)
// 			continue
// 		}
// 		pipe.pipeFile = pipeFile
// 		log.Print("Pipe file open: ", pipe.pipeFilePath)

// 		if readable {
// 			go pipe.readMessagesLoop()
// 		}
// 		if writeable {
// 			go pipe.writeMessagesLoop()
// 		}

// 		select {
// 		case <-pipe.exitRWLoopsSignal.GetSignal():
// 			<-time.After(time.Second)
// 			continue
// 		case <-exitSignal.GetSignal():
// 			pipe.log.Print("Exiting pipe loops...")
// 			pipe.exitRWLoopsSignal.Trigger()
// 			return nil
// 		}
// 	}

// }
