package main

import (
	"flag"
	"os"
	"os/signal"
	"syscall"
	"time"

	log "github.com/sirupsen/logrus"
)

var sendMessagesToUnixSocketChan = make(chan string, 12) // a channel with a buffer of 12 messages which can pile up until they are handled
var messagesFromUnixSocketChan = make(chan string, 12) // a channel with a buffer of 12 messages which can pile up until they are handled


// flags
var videoShellCommand = ""
var peerServerListenPort = ""
var ADD_METADATA_TO_UNIX_SOCKET_MESSAGES = true

func main() {

	// Parse the flags passed to program
	flag.StringVar(&videoShellCommand, "video-shell-cmd", "cat -", "Shell command that will send a h264 video stream to stdout, Default is \"cat -\"")
	flag.StringVar(&peerServerListenPort, "peerserver-listen-port", "8181", "Port number for the go peerjs server to listen on. Default is 8181")
	// flag.BoolVar(&ADD_METADATA_TO_UNIX_SOCKET_MESSAGES, "add-metadata-to-messages", true, "If true, when a datachannel message is recived, metataa like the sender's peer id will be prepended to all message, followed by the delimeter before being sent to the unix socket. Default is false")
	flag.Parse()

	// Set up the logrus logger
	log.SetFormatter(&log.TextFormatter{
		DisableColors: true,
		DisableTimestamp: true,
	})

	// Create a simple boolean "channel" that we can use to signal to go subroutine functions that they should stop when we close it:
	quitProgramChan := make(chan bool)
	defer func() {
		if r := recover(); r != nil {
			quitProgramChan <- true
			log.Println("Recovered from panic in main, closing down...", r)
		}
	}()

	// Create the unix socket to send and receive data to - from python

	// sock := CreateUnixSocket(quitProgramChan, messagesFromUnixSocketChan, sendMessagesToUnixSocketChan, UNIX_SOCKET_PATH)
	// defer sock.CleanupSocket()

	// DEBUG FOR SOCKET MESSAGES
	// go func() {
	// 	for {
	// 		select {
	// 		case <-quitProgram:
	// 			return
	// 		case <-time.After(time.Second * 1):
	// 			sock.socketWriteChannel <- "{\"ping\":3}"
	// 		case msg := <- sock.socketReadChannel:
	// 			log.Debug("Got message from socket: ", msg)
	// 		}
	// 	}
	// }()

	// DEBUG FOR ECHOING BACK ALL MESSAGES & BYPASSING SOCKET
	// go func() {
	// 	for {
	// 		select {
	// 		case msg := <-sendMessagesToUnixSocket:
	// 			log.Println("Received message from unix socket: ", msg)
	// 			messagesFromUnixSocket <- "DEBUG USOCKET ECHO: " + msg
	// 		case <-quitProgramChan:
	// 			log.Println("Closing down echo loop bcuz of quit program channel")
	// 			return
	// 		}
	// 	}
	// }()

	// Setup the video stream and start the camera running
	initVideoTrack()
	go pipeVideoToStream(quitProgramChan)

	// Setup the peerjs client to accept webrtc connections
	go setupLocalAndCloudConnections(quitProgramChan)

	// Wait for a signal to stop the program
	systemExitCalled := make(chan os.Signal, 1) // Create a channel to listen for an interrupt signal from the OS.
	signal.Notify(systemExitCalled, os.Interrupt, syscall.SIGQUIT, syscall.SIGTERM, syscall.SIGHUP) // tell the OS to send us a signal on the systemExitCalled go channel when it wants us to exit
	defer time.Sleep(time.Second) // sleep a Second at very end to allow everything to finish.
	// wait until a signal on the done or systemExitCalled go channel variables is received.
	select {
	case <-quitProgramChan:
		log.Println("quit Program channel triggered, exiting")
		return
	case <-systemExitCalled:
		log.Println("ctrl+c or other system interrupt received, exiting")
		close(quitProgramChan) // tell the go subroutines to exit by closing the quitProgram channel
		return
	}
}