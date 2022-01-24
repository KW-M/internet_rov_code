package main

import (
	"log"
	"net"
	"time"
)

// for passing messages back and forth to the python program

type rovUnixSocket struct {
	socketOpen bool
	socketConnection net.Conn
	socketListener net.Listener
	readBufferSize int
	onMessageCallback func(string) error
}

// from https://gist.github.com/hakobe/6f70d69b8c5243117787fd488ae7fbf2

func (sock *rovUnixSocket) readUnixSocketAsync() {
	// ment to be run as a goroutine
	// will call the onMessageCallback when a message is received with the message as a string
	buf := make([]byte, 512)
	for {

		nr, err := sock.socketConnection.Read(buf)
		if err != nil {
			return
		}

		message := string(buf[0:nr])
		log.Println("UDS got message:",message)

	}

}

func (sock *rovUnixSocket) writeUnixSocket(message string) {
	sock.socketConnection.Write([]byte(message))
}

// "/tmp/go.sock"
func (sock *rovUnixSocket) create_unix_socket(closeSocket chan bool, unix_socket_path string) *rovUnixSocket {
	var err error
	sock.socketListener, err = net.Listen("unix", unix_socket_path)
	if err != nil {
		log.Fatal("Unix Socket Listen error: ", err)
	}

	go func() {
		closeSocketSignal := <-closeSocket
		if closeSocketSignal {
			sock.socketConnection.Close()
			sock.socketListener.Close()
			sock.socketOpen = false
		}
	}()

	go func() {
		for {
			// attempt to accept socket
			sock.socketConnection, err = sock.socketListener.Accept()
			if err != nil {
				log.Println("Accept unix socket ERROR: ", err)
				time.Sleep(time.Second)
				sock.socketOpen = false
			} else {
				sock.socketOpen = true
			}
		}
	}()

	return sock
}