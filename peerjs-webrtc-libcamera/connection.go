package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"

	"log"
	"strconv"
	"time"

	// "flag"
	"fmt"

	// "strconv"
	// "os"
	// "os/signal"
	// "sync"

	peerjs "github.com/KW-M/peerjs-go"
	peerjsServer "github.com/KW-M/peerjs-go/server"
)

var err error // handy variable to stuff any error messages into

// To handle the case where multiple rovs are running at the same time,
// we make the PeerId of this ROV the basePeerId plus a number tacked on
// the end (rovNumber, eg: SSROV_0) that we increment if the current peerId is already taken.
var basePeerId string = "SSROV_"
var rovNumber int = 0

// ----- PeerJs-Go Client Settings -----
var peerServerCloudOpts,peerServerLocalOpts peerjs.Options
func makePeerJsOptions() {
	// FOR CLOUD HOSTED PEERJS SERVER running on heroku (or wherever, or you could use the default server):
	peerServerCloudOpts = peerjs.NewOptions()
	peerServerCloudOpts.Host = "0.peerjs.com"
	peerServerCloudOpts.Port = 443
	peerServerCloudOpts.Path = "/"
	peerServerCloudOpts.Key = "peerjs"
	peerServerCloudOpts.Secure = true
	peerServerCloudOpts.Debug = 3
	peerServerCloudOpts.PingInterval = 3000
	// FOR LOCAL PEERJS SERVER RUNNING ON THIS raspberrypi (not heroku):
	peerServerLocalOpts = peerjs.NewOptions()
	peerServerLocalOpts.Host = "localhost"
	peerServerLocalOpts.Port = 9000
	peerServerLocalOpts.Path = "/"
	peerServerLocalOpts.Key = "peerjs"
	peerServerLocalOpts.Secure = false
	peerServerLocalOpts.Debug = 3
	peerServerLocalOpts.PingInterval = 3000
}

func startLocalPeerJsServer(done chan bool) {
	serverOptions := peerjsServer.NewOptions()
	serverOptions.LogLevel = "Debug"
	serverOptions.AllowDiscovery = true
	serverOptions.Port = peerServerLocalOpts.Port
	serverOptions.Host = peerServerLocalOpts.Host
	serverOptions.Path = peerServerLocalOpts.Path
	serverOptions.Key = peerServerLocalOpts.Key
	server := peerjsServer.New(serverOptions)
	var err = server.Start()
	defer server.Stop()
	if err != nil {
		fmt.Printf("Error starting local peerjs server: %s\n", err)
		return
	}
	for { // wait for the done channel to be triggered at which point this function will exit and the local peerjs server will stop
		select{
			case <-done:
				return
			default:
		}
		time.Sleep(time.Microsecond * 300)
	}
}

func setupConnections(done chan bool) {
	makePeerJsOptions()
	go startLocalPeerJsServer(done)

	// exitLocalConnection := make(chan bool)
	// go func() {
	// 	for {
	// 		if signal := <-done; signal {
	// 			break
	// 		}
	// 		setupWebrtcConnection(exitLocalConnection, peerServerLocalOpts)
	// 	}
	// }()

	exitCloudConnection := make(chan bool)
	go func() {
		for {
			select{
				case <-done:
					return
				default:
			}
			setupWebrtcConnection(exitCloudConnection, peerServerCloudOpts)
		}
	}()

	out:
	for { // wait for the done channel to be triggered at which point close each of the connection function channels
		select{
			case <-done:
				break out
			default:
		}
		time.Sleep(time.Microsecond * 300)
	}
	// exitLocalConnection <- true
	exitCloudConnection <- true
}

// should be called as a goroutine
func setupWebrtcConnection(exitFunction chan bool, peerServerOptions peerjs.Options) {

	var rovPeerId string = "SSROV_" + strconv.Itoa(rovNumber)
	var rovPeer, err = peerjs.NewPeer(rovPeerId, peerServerOptions)
	defer rovPeer.Close() // close the websocket connection when this whole outer function exits
	if err != nil {
		log.Println("Error creating ROV peer: ", err)
		exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
	}

	rovPeer.On("open", func(peerId interface{}) {
		var peerID string = peerId.(string) // typecast to string

		fmt.Printf("This ROV Peer established with Peer ID: %s\n", peerID)
		if peerID[:len(basePeerId)] != basePeerId {
			fmt.Printf("Uh oh, Peer Id %s must have been taken, switching to next rov Number\n", rovPeerId)
			rovNumber++ // increment the rovNumber and try again
			exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over and rerun this function
		}

		rovPeer.On("connection", func(data interface{}) {
			pilotDataConnection := data.(*peerjs.DataConnection) // typecast to DataConnection

			pilotDataConnection.On("data", func(data interface{}) {
				log.Printf("Received: %#v: %s\n", data, data)
			})

			pilotDataConnection.On("close", func(message interface{}) {
				println("PILOT PEER DATACHANNEL CLOSE EVENT", message)
			})

			pilotDataConnection.On("disconnected", func(message interface{}) {
				println("PILOT PEER DATACHANNEL DISCONNECTED EVENT", message)
			})

			pilotDataConnection.On("error", func(message interface{}) {
				fmt.Printf("PILOT PEER DATACHANNEL ERROR EVENT: %s", message)
			})

			log.Println("Peer connection established with Pilot Peer ID: ", pilotDataConnection.GetPeerID())

			// pilotDataConnection.On("open", func(message interface{}) {
			// 	var pilotPeerId string = pilotDataConnection.GetPeerID()
			// 	fmt.Printf("Calling Pilot Peer ID: %s\n", pilotPeerId)
			// 	_, err = rovWebsocketPeer.Call(pilotPeerId, rovLives treamVideoTrack, peerjs.NewConnectionOptions())
			// 	if err != nil {
			// 		log.Println("Error calling pilot id: ", pilotPeerId)
			// 		log.Fatal(err)
			// 	}

			// 	// go func() {
			// 	// 	// send a repeating message to the pilot
			// 	// 	for {
			// 	// 		pilotDataConnection.Send([]byte("hi!"), false)
			// 	// 		<-time.After(time.Millisecond * 1000)
			// 	// 		if shouldEndProgram := <-done; shouldEndProgram { // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
			// 	// 			return
			// 	// 		}
			// 	// 	}
			// 	// }()
			// })
		})
	})

	rovPeer.On("close", func(message interface{}) {
		println("ROV PEER JS CLOSE EVENT", message)
		<-exitFunction
	})

	rovPeer.On("disconnected", func(message interface{}) {
		println("ROV PEER JS DISCONNECTED EVENT", message)
		// rovPeer.reconnect();
		<-exitFunction
	})

	rovPeer.On("error", func(message interface{}) {
		fmt.Printf("ROV PEER JS ERROR EVENT: %s", message)
		<-exitFunction
	})


	// conn1, _ := peer1.Connect("peer287", nil)
	// conn1.On("open", func(data interface{}) {
	// 	for {
	// 		conn1.Send([]byte("huuui!"), false)
	// 		<-time.After(time.Millisecond * 1000)
	// 	}
	// })
	// ---------------------------------------------------------------------------------------------------------------------
	fmt.Println("starting setupWebrtcConnection goroutine sleep")
	<-exitFunction // when a signal is sent on the 'exitFunction' channel from the main.go file to clean up because program is exiting or somthin, unblock this goroutine and exit.
	log.Println("exiting setupWebrtcConnection")
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

