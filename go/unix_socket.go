package main

import (
	"log"
	"net"
	"time"
	// log "github.com/sirupsen/logrus"
)

// for passing messages back and forth to the python program
// from https://go.dev/play/p/jupwWV8pdH
type RovUnixSocket struct {
	socketOpen         bool
	doReconnectSignal  chan bool
	socketConnection   net.Conn
	socketListener     net.Listener
	socketWriteChannel chan string
	socketReadChannel  chan string
}

// ReadUnixSocketAsync: ment to be run as a goroutine
// will call the onMessageCallback when a message is received with the message as a string
func (sock *RovUnixSocket) ReadUnixSocketAsync(readBufferSize int) {
	buf := make([]byte, readBufferSize)
	for {
		if sock.socketOpen {
			nr, err := sock.socketConnection.Read(buf)
			if err != nil {
				log.Println("UNIX SOCKET READ ERROR: ", err)
				sock.doReconnectSignal <- true
			}

			message := string(buf[0:nr])
			log.Println("UNIX SOCKET got message:", message)
			sock.socketReadChannel <- message
		}
	}

}

func (sock *RovUnixSocket) WriteUnixSocketAsync() {
	for {
		if sock.socketOpen {
			msg, chanIsOpen := <-sock.socketWriteChannel
			if chanIsOpen && msg != "" {
				_, err := sock.socketConnection.Write([]byte(msg))
				if err != nil {
					log.Println("UNIX SOCKET WRITE ERROR: ", err)
					sock.doReconnectSignal <- true
				}
			}
		}
	}
}

// connect starts listening on a unix domain socket at the particular address using the SOCK_SEQPACKET socket format.
// path is the name of the unix socket to connect to (eg. "/tmp/whatever.sock").
func (*RovUnixSocket) createSocketListener(path string) (*net.UnixListener, error) {
	// try to remove any old socket file if it is still open
	// err := os.Remove(path)
	// if err != nil {
	// 	log.Println("ERROR REMOVING SOCKET FILE: ",err)
	// }
	log.Println("Creating socket listener...", path)
	addr, err := net.ResolveUnixAddr("unixpacket", path)
	if err != nil {
		return nil, err
	}
	log.Println("Resolved addr socket listener...", path)
	listener, err := net.ListenUnix("unixpacket", addr)
	log.Println("listening to addr socket listener...", path)
	return listener, err
}

/* Closes any open socket connections & removes the listener */
func (sock *RovUnixSocket) CleanupSocket() {
	if sock.socketConnection != nil {
		sock.socketConnection.Close()
	}
	if sock.socketListener != nil {
		sock.socketListener.Close()
	}
	sock.socketOpen = false
}

func (sock *RovUnixSocket) openSocket(closeSocketSignal chan bool, unixSocketPath string) bool {
	// catch any errors or returns gracefully and CleanupSocket
	defer func() {
		if r := recover(); r != nil {
			log.Println("Recovered in openSocket()...", r)
		}
		sock.CleanupSocket()
	}()

	// attempt to open socket
	sock.socketListener, err = sock.createSocketListener(unixSocketPath)
	if err != nil {
		log.Println("UNIX SOCKET Initilization Error: ", err)
	}
	log.Println("UNIX SOCKET Listening for Connection...")
	sock.socketConnection, err = sock.socketListener.Accept()
	if err != nil {
		log.Println("UNIX SOCKET ACCEPT ERROR: ", err)
		return false
	}
	sock.socketOpen = true
	go sock.ReadUnixSocketAsync(1024)
	go sock.WriteUnixSocketAsync()
	log.Println("Unix socket open! Listening for messages on: ", unixSocketPath)
	select {
	case <-sock.doReconnectSignal:
		return false
	case <-closeSocketSignal:
		return true
	}
}

// connect starts listening on a unix domain socket at the particular address using the SOCK_SEQPACKET socket format.
// closeSocketSignal is the channel that will signal to this goroutine to close the socket.
// recivedMessageChannel is a string channel When a message is recived on the socket it will be sent to this channel.
// sendMessageChannel is a string channel. When a message is sent on this channel, it will be sent to the socket.
// unixSocketPath is the path the unix socket to connect to (eg. "/tmp/whatever.sock").
func CreateUnixSocket(closeSocketSignal chan bool, recivedMessageChannel chan string, sendMessageChannel chan string, unixSocketPath string) *RovUnixSocket {
	var sock = new(RovUnixSocket)
	sock.socketOpen = false
	sock.socketWriteChannel = sendMessageChannel
	sock.socketReadChannel = recivedMessageChannel
	sock.doReconnectSignal = make(chan bool)

	go func() {
		for {
			var shouldExit bool = sock.openSocket(closeSocketSignal, unixSocketPath)
			if shouldExit == true {
				log.Println("Exiting socket reconnect loop...")
				break
			}
			time.Sleep(time.Second * 2)
		}
	}()

	return sock
}