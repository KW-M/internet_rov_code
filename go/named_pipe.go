package main

import (
	"bufio"
	"os"
	"syscall"
	"time"

	// "os"

	log "github.com/sirupsen/logrus"
)

type NamedPipeRelay struct {
	pipeFile            *os.File
	pipeFilePath        string
	exitRWLoopsSignal   *UnblockSignal
	SendMessagesToPipe  chan string
	GetMessagesFromPipe chan string
	readBufferSize      int
	log                 *log.Entry
}

func CreateNamedPipeRelay(pipeFilePath string, readBufferSize int) (*NamedPipeRelay, error) {
	var pipe = NamedPipeRelay{
		pipeFile:            nil,
		pipeFilePath:        pipeFilePath,
		exitRWLoopsSignal:   newUnblockSignal(),
		SendMessagesToPipe:  make(chan string),
		GetMessagesFromPipe: make(chan string),
		readBufferSize:      readBufferSize,
		log:                 log.WithField("pipe", pipeFilePath),
	}

	// attempt to create the named pipe file if doesn't already exist:
	if _, err := os.Stat(pipeFilePath); err != nil {
		err := syscall.Mkfifo(pipeFilePath, 0666)
		if err != nil {
			pipe.log.Error("Make named pipe file error:", err)
			return nil, err
		}
	}

	return &pipe, nil
}

func (pipe *NamedPipeRelay) Close() {
	pipe.log.Print("Closing pipe file")
	if pipe.pipeFile != nil {
		pipe.pipeFile.Close()
	}
}

func (pipe *NamedPipeRelay) readMessagesLoop() {
	defer pipe.log.Print("Exiting read loop...")
	scanner := bufio.NewScanner(pipe.pipeFile)
	for scanner.Scan() {
		if pipe.exitRWLoopsSignal.HasTriggered {
			return
		} else if err := scanner.Err(); err != nil {
			pipe.log.Printf("Error reading message from pipe: %v", err)
			pipe.exitRWLoopsSignal.TriggerWithError(err)
			return
		}
		pipe.GetMessagesFromPipe <- scanner.Text()
	}
}

func (pipe *NamedPipeRelay) writeMessagesLoop() {
	// writer := bufio.NewWriter(pipe.pipeFile)
	pipe.log.Print("Entering write loop...")
	defer pipe.log.Print("Exiting write loop...")
	for {
		select {
		case <-pipe.exitRWLoopsSignal.GetSignal():
			return
		case message := <-pipe.SendMessagesToPipe:
			log.Print("Writing message to pipe: ", message)
			// _, err := writer.WriteString(message + "\n")
			num, err := pipe.pipeFile.WriteString(message + "\n")
			log.Print("Num: ", num)
			if err != nil {
				pipe.log.Printf("Error writing message to pipe: %v", err)
				pipe.exitRWLoopsSignal.TriggerWithError(err)
				return
			}
		}
	}
}

func (pipe *NamedPipeRelay) runPipeLoops(exitSignal *UnblockSignal, readable bool, writeable bool) error {
	defer pipe.Close()
	for {
		pipeFile, err := os.OpenFile(pipe.pipeFilePath, os.O_RDWR, os.ModeNamedPipe|0666)
		if err != nil {
			pipe.log.Error("Error opening named pipe:", err)
			<-time.After(time.Second)
			continue
		}
		pipe.pipeFile = pipeFile
		log.Print("Pipe file open: ", pipe.pipeFilePath)

		if readable {
			go pipe.readMessagesLoop()
		}
		if writeable {
			go pipe.writeMessagesLoop()
		}

		select {
		case <-pipe.exitRWLoopsSignal.GetSignal():
			<-time.After(time.Second)
			continue
		case <-exitSignal.GetSignal():
			pipe.log.Print("Exiting pipe loops...")
			pipe.exitRWLoopsSignal.Trigger()
			return nil
		}
	}
}

type DuplexNamedPipeRelay struct {
	incomingPipe        *NamedPipeRelay
	outgoingPipe        *NamedPipeRelay
	SendMessagesToPipe  chan string
	GetMessagesFromPipe chan string
	readBufferSize      int
	log                 *log.Entry
}

func CreateDuplexNamedPipeRelay(incomingPipeFilePath string, outgoingPipeFilePath string, readBufferSize int) (*DuplexNamedPipeRelay, error) {
	var duplexPipe = DuplexNamedPipeRelay{
		readBufferSize: readBufferSize,
		log:            log.WithField("duplex_pipe_pair", true),
	}

	var err error

	duplexPipe.incomingPipe, err = CreateNamedPipeRelay(incomingPipeFilePath, readBufferSize)
	if err != nil {
		duplexPipe.log.Error("Error creating incoming pipe:", err)
		return nil, err
	}

	duplexPipe.outgoingPipe, err = CreateNamedPipeRelay(outgoingPipeFilePath, readBufferSize)
	if err != nil {
		duplexPipe.log.Error("Error creating outgoing pipe:", err)
		return nil, err
	}

	// setup duplex channel
	duplexPipe.SendMessagesToPipe = duplexPipe.outgoingPipe.SendMessagesToPipe
	duplexPipe.GetMessagesFromPipe = duplexPipe.incomingPipe.GetMessagesFromPipe

	// duplexPipe.SendMessagesToPipe <- "Hello1"

	return &duplexPipe, nil
}

func (pipe *DuplexNamedPipeRelay) Close() {
	pipe.incomingPipe.Close()
	pipe.outgoingPipe.Close()
}

func (pipe *DuplexNamedPipeRelay) runPipeLoops(exitSignal *UnblockSignal) {
	defer pipe.Close()
	go pipe.incomingPipe.runPipeLoops(exitSignal, true, false)
	go pipe.outgoingPipe.runPipeLoops(exitSignal, false, true)
	exitSignal.Wait()
}
