package main

import (
	"flag"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var uSockSendMsgChannel = make(chan string, 12) // a channel with a buffer of 12 messages which can pile up until they are handled
var uSockMsgRecivedChannel = make(chan string, 12)// a channel with a buffer of 12 messages which can pile up until they are handled

func main() {
	// Parse the flags passed to program
	// videoShellCommand := ""
	// httpListenPort := ""
	// flag.StringVar(&videoShellCommand, "video-shell-cmd", "cat -" "Shell command that will start generating h264 stream", "")
	// flag.StringVar(&httpListenAddress, "udp-video-listen-address", "http://localhost:8080", "Port number to pull the video stream from. Default is http://localhost:8080")
	// flag.StringVar(&httpListenAddress, "websocket-listen-port", ":8181", "Port number for websocket HTTP server to listen on. Default is :8181")
	flag.Parse()

	// Create a simple boolean "channel" that we can use to signal to go subroutine functions that they should stop when we close it:
	quitProgram := make(chan bool)

	// Create the unix socket to send and receive data to - from python

	CreateUnixSocket(quitProgram, uSockMsgRecivedChannel, uSockSendMsgChannel, "/tmp/go.socket")

	// // DEBUG FOR ECHOING BACK ALL MESSAGES
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

	// Setup the video stream and start the camera running
	initVideoTrack()
	go pipeVideoToStream(quitProgram)

	// Setup the peerjs client to accept webrtc connections
	go setupConnections(quitProgram)

	// Wait for a signal to stop the program
	systemExitCalled := make(chan os.Signal, 1)                                    // Create a channel to listen for an interrupt signal from the OS.
	signal.Notify(systemExitCalled, os.Interrupt, syscall.SIGQUIT, syscall.SIGTERM, syscall.SIGHUP) // tell the OS to send us a signal on the systemExitCalled go channel when it wants us to exit
	defer time.Sleep(time.Second)                                                  // sleep a Second at very end to allow everything to finish.
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

// import (
// 	// "flag"
// 	"log"
// 	"os"
// 	"os/signal"
// 	"syscall"
// 	"time"

// 	peerjs "github.com/muka/peerjs-go"
// )

// func main() {

// 	// Create a simple boolean "channel" that go subroutine functions can use to signal that they are done processing:
// 	done := make(chan bool)

// 	go func() {
// 		peerjsOpts := peerjs.NewOptions()
// 		peerjsOpts.Debug = 3

// 		peer2, _ := peerjs.NewPeer("SSROV_0", peerjsOpts)
// 		defer peer2.Close()

// 		peer2.On("connection", func(data interface{}) {
// 			conn2 := data.(*peerjs.DataConnection)
// 			conn2.On("data", func(data interface{}) {
// 				// Will print 'hi!'
// 				log.Printf("Receuuuived: %#v: %s\n", data, data)
// 			})
// 		})

// 		peer2.On("close", func(message interface{}) {
// 			println("PEER CLOSE EVENT", message)
// 		})

// 		peer2.On("disconnected", func(message interface{}) {
// 			println("PEER DISCONNECTED EVENT", message)
// 			// println("reconnecting peer...")
// 		})

// 		peer2.On("error", func(message interface{}) {
// 			log.Printf("PEER ERROR EVENT: %s", message)
// 		})

// 		for {
// 			select{
// 				case <-done:
// 					return
// 				default:
// 			}
// 			time.Sleep(time.Microsecond * 300)
// 		}
// 	}()

// 	systemExitCalled := make(chan os.Signal, 1) // Create a channel to listen for an interrupt signal from the OS.
// 	signal.Notify(systemExitCalled, os.Interrupt, syscall.SIGTERM, syscall.SIGHUP) // tell the OS to send us a signal on the systemExitCalled go channel when it wants us to exit
// 	defer time.Sleep(time.Second) // sleep a Second at very end to allow everything to finish.
// 	for { // Loop until a signal on the done or systemExitCalled go channel variables is received.
// 		select {
// 		case <-done:
// 			log.Println("Done channel triggered, exiting")
// 			return
// 		case <-systemExitCalled:
// 			log.Println("ctrl+c or other system interrupt received, exiting")
// 			close(done) // tell the go subroutines to exit by closing the done channel
// 			return
// 		}
// 	}
// }
