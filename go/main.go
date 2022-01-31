package main

import (
	"flag"
	"os"
	"os/signal"
	"syscall"
	"time"

	log "github.com/sirupsen/logrus"
)

var uSockSendMsgChannel = make(chan string, 12) // a channel with a buffer of 12 messages which can pile up until they are handled
var uSockMsgRecivedChannel = make(chan string, 12)// a channel with a buffer of 12 messages which can pile up until they are handled

func main() {
	// Parse the flags passed to program
	// videoShellCommand := ""
	// peerServerListenPort := ""
	// flag.StringVar(&videoShellCommand, "video-shell-cmd", "cat -" "Shell command that will start generating h264 stream", "")
	// flag.StringVar(&httpListenAddress, "udp-video-listen-address", "http://localhost:8080", "Port number to pull the video stream from. Default is http://localhost:8080")
	// flag.StringVar(&peerServerListenPort, "peerserver-listen-port", "8181", "Port number for websocket HTTP server to listen on. Default is :8181")
	flag.Parse()

	log.SetFormatter(&log.TextFormatter{
		DisableColors: true,
		DisableTimestamp: true,
	})

	// Create a simple boolean "channel" that we can use to signal to go subroutine functions that they should stop when we close it:
	quitProgram := make(chan bool)
	defer func() {
		if r := recover(); r != nil {
			quitProgram <- true
			log.Println("Recovered from panic in main, closing down...", r)
		}
	}()

	// Create the unix socket to send and receive data to - from python

	sock := CreateUnixSocket(quitProgram, uSockMsgRecivedChannel, uSockSendMsgChannel, "/tmp/go.sock")
	defer sock.CleanupSocket()

	// DEBUG FOR SOCKET MESSAGES
	go func() {
		for {
			select {
			case <-quitProgram:
				return
			case <-time.After(time.Second * 1):
				sock.socketWriteChannel <- "WOOOOOt"
			case msg := <- sock.socketReadChannel:
				log.Debug("Got message from socket: ", msg)
			}
		}
	}()

	// // DEBUG FOR ECHOING BACK ALL MESSAGES & BYPASSING SOCKET
	// go func() {
	// 	for {
	// 		select {
	// 		case <-quitProgram:
	// 			return
	// 		case msg := <-uSockSendMsgChannel:
	// 			log.Println("Received message from unix socket: ", msg)
	// 			uSockMsgRecivedChannel <- "Message received: " + msg
	// 		}
	// 	}
	// }()

	// // Setup the video stream and start the camera running
	// initVideoTrack()
	// go pipeVideoToStream(quitProgram)

	// // Setup the peerjs client to accept webrtc connections
	// go setupConnections(quitProgram)

	// Wait for a signal to stop the program
	systemExitCalled := make(chan os.Signal, 1) // Create a channel to listen for an interrupt signal from the OS.
	signal.Notify(systemExitCalled, os.Interrupt, syscall.SIGQUIT, syscall.SIGTERM, syscall.SIGHUP) // tell the OS to send us a signal on the systemExitCalled go channel when it wants us to exit
	defer time.Sleep(time.Second) // sleep a Second at very end to allow everything to finish.
	// wait until a signal on the done or systemExitCalled go channel variables is received.
	select {
	case <-quitProgram:
		log.Println("quitProgram channel triggered, exiting")
		return
	case <-systemExitCalled:
		log.Println("ctrl+c or other system interrupt received, exiting")
		close(quitProgram) // tell the go subroutines to exit by closing the quitProgram channel
		return
	}
}