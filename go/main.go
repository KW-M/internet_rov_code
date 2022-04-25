package main

import (
	"flag"
	"os"
	"os/signal"
	"syscall"
	"time"

	log "github.com/sirupsen/logrus"
)

// command line flag placeholder variables
var configFilePath string = "./secret_config.json"
var config *ProgramConfig
var msgPipe *DuplexNamedPipeRelay

func sendMessageThroughNamedPipez(message string) {
	select {
	case msgPipe.SendMessagesToPipe <- message:
		log.Println("Sent message: ", message)
	case <-time.After(time.Millisecond * 50):
		log.Error("Pipe: Go channel is full! Msg:", message)
	}
}

func parseProgramCmdlineFlags() {
	flag.StringVar(&configFilePath, "config-file", "./webrtc-relay-config.json", "Path to the config file. Default is ./webrtc-relay-config.json")
	flag.Parse()
}

// var sendMessagesToUnixSocketChan = make(chan string, 24) // a channel with a buffer of 24 messages which can pile up until they are handled
// var messagesFromUnixSocketChan = make(chan string, 24)   // a channel with a buffer of 24 messages which can pile up until they are handled

func main() {
	println("------------ Starting WebRTC Relay ----------------")

	// Parse the command line parameters passed to program in the shell eg "-a" in "ls -a"
	// read the config file and set it to the config global variable
	parseProgramCmdlineFlags()
	config, err = ReadConfigFile(configFilePath)
	if err != nil {
		log.Fatal("Failed to read config file: ", err)
	}

	// Set up the logrus logger
	log.SetLevel(log.DebugLevel)
	log.SetFormatter(&log.TextFormatter{
		DisableColors:    true,
		DisableTimestamp: true,
		DisableQuote:     true,
	})

	// Create a simple boolean "channel" that we can close to signal to go subroutine functions that they should stop cleanly:
	programShouldQuitSignal := newUnblockSignal()
	defer func() {
		if r := recover(); r != nil {
			log.Println("Recovered from panic in main, exiting program...", r)
			programShouldQuitSignal.Trigger()
		}
	}()

	print("Creating named pipe relay folder...", config.NamedPipeFolder)
	os.MkdirAll(config.NamedPipeFolder, os.ModePerm)

	// Create the two named pipes to send and receive data to / from the webrtc-relay user's backend code
	msgPipe, err = CreateDuplexNamedPipeRelay(config.NamedPipeFolder+"to_datachannel_relay.pipe", config.NamedPipeFolder+"from_datachannel_relay.pipe", 4096)
	if err != nil {
		log.Fatal("Failed to create message relay named pipe: ", err)
	}
	defer msgPipe.Close()
	go msgPipe.runPipeLoops(programShouldQuitSignal)

	// initVideoTrack()
	// go pipeVideoToStream(programShouldQuitSignal)

	mediaSrc, err := CreateNamedPipeMediaSource(config.NamedPipeFolder+"vido.pipe", 10000, "video/h264", "my-stream")
	if err != nil {
		log.Error("Error creating named pipe media source: ", err)
		return
	}
	cameraLivestreamVideoTrack = mediaSrc.WebrtcTrack
	go mediaSrc.startMediaStream(programShouldQuitSignal)

	// Setup the peerjs client to accept webrtc connections
	go startPeerServerConnectionLoop(programShouldQuitSignal)

	// Wait for a signal to stop the program
	systemExitCalled := make(chan os.Signal, 1)                                                     // Create a channel to listen for an interrupt signal from the OS.
	signal.Notify(systemExitCalled, os.Interrupt, syscall.SIGQUIT, syscall.SIGTERM, syscall.SIGHUP) // tell the OS to send us a signal on the systemExitCalled go channel when it wants us to exit
	defer time.Sleep(time.Second)                                                                   // sleep a Second at very end to allow everything to finish.
	// wait until a signal on the done or systemExitCalled go channel variables is received.
	select {
	case <-programShouldQuitSignal.GetSignal():
		log.Println("quit Program channel triggered, exiting")
		return
	case <-systemExitCalled:
		log.Println("ctrl+c or other system interrupt received, exiting")
		programShouldQuitSignal.Trigger() // tell the go subroutines to exit by closing the programShouldQuitSignal channel
		return
	}
}

// func scheduleWrite(pipe *NamedPipeRelay) {
// 	for {
// 		<-time.After(time.Second * 1)
// 		print(".")
// 		pipe.SendMessagesToPipe <- "Hello" + time.Now().String()
// 	}
// }

// func readLoop(pipe *NamedPipeRelay) {
// 	for {
// 		message := <-pipe.GetMessagesFromPipe
// 		pipe.log.Info("Message from pipe: ", message)
// 	}
// }
