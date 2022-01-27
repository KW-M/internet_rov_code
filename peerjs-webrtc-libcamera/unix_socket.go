package main

import (
	"net"
	"time"

	log "github.com/sirupsen/logrus"
)

// for passing messages back and forth to the python program
// from https://go.dev/play/p/jupwWV8pdH
type RovUnixSocket struct {
	socketOpen bool
	socketConnection net.Conn
	// socketListener net.Listener
	socketWriteChannel chan string
	socketReadChannel chan string
}

// ReadUnixSocketAsync: ment to be run as a goroutine
// will call the onMessageCallback when a message is received with the message as a string
func (sock *RovUnixSocket) ReadUnixSocketAsync(readBufferSize int) {
	buf := make([]byte, readBufferSize)
	for {
		if sock.socketOpen {
			nr, err := sock.socketConnection.Read(buf)
			if err != nil {
				log.Warn("UNIX SOCKET READ ERROR: ", err)
				time.Sleep(time.Second * 1)
				continue
			}

			message := string(buf[0:nr])
			log.Debug("UNIX SOCKET got message:",message)
			sock.socketReadChannel <- message
		}
	}

}

func (sock *RovUnixSocket) WriteUnixSocketAsync() {
	for {
		msg, chanIsOpen := <-sock.socketWriteChannel
		if sock.socketOpen && chanIsOpen &&  msg != "" {
			sock.socketConnection.Write([]byte(msg))
		}
	}
}


// connect starts listening on a unix domain socket at the particular address using the SOCK_SEQPACKET socket format.
// path is the name of the unix socket to connect to (eg. "/tmp/whatever.sock").
func (*RovUnixSocket) connect(path string) (*net.UnixConn, error) {
	addr, err := net.ResolveUnixAddr("unixpacket", path)
	if err != nil {
		return nil, err
	}
	conn, err := net.ListenUnixgram("unixpacket", addr)
	return conn, err
}

// connect starts listening on a unix domain socket at the particular address using the SOCK_SEQPACKET socket format.
// closeSocketSignal is the channel that will signal to this goroutine to close the socket.
// recivedMessageChannel is a string channel When a message is recived on the socket it will be sent to this channel.
// sendMessageChannel is a string channel. When a message is sent on this channel, it will be sent to the socket.
// unixSocketPath is the path the unix socket to connect to (eg. "/tmp/whatever.sock").
func CreateUnixSocket(closeSocketSignal chan bool, recivedMessageChannel chan string, sendMessageChannel chan string, unixSocketPath string) *RovUnixSocket {
	var err error
	var sock = new(RovUnixSocket)
	sock.socketOpen = false
	sock.socketWriteChannel = sendMessageChannel
	sock.socketReadChannel = recivedMessageChannel

	go func() {
		for {
			// attempt to open socket
			sock.socketConnection, err = sock.connect(unixSocketPath)
			if err != nil {
				log.Error("UNIX SOCKET INITILIZATION ERROR: ", err)
				time.Sleep(time.Second * 2)
				continue
			}
			sock.socketOpen = true
			go sock.ReadUnixSocketAsync(1024)
			go sock.WriteUnixSocketAsync()
			doClose := <-closeSocketSignal
			if doClose {
				sock.socketConnection.Close()
				close(sock.socketWriteChannel)
				close(sock.socketReadChannel)
				sock.socketOpen = false
				return
			}
		}
	}()

	return sock
}