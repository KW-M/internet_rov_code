package main

import (
	"net"
	"os"
	"time"

	log "github.com/sirupsen/logrus"
)

// for passing messages back and forth to the python program
// from https://go.dev/play/p/jupwWV8pdH
type RovUnixSocket struct {
	socketOpen         bool
	doReconnectSignal chan bool
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
				log.Warn("UNIX SOCKET READ ERROR: ", err)
				sock.doReconnectSignal <- true
			}

			message := string(buf[0:nr])
			log.Debug("UNIX SOCKET got message:", message)
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
					log.Warn("UNIX SOCKET WRITE ERROR: ", err)
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
	os.Remove(path)
	addr, err := net.ResolveUnixAddr("unixpacket", path)
	if err != nil {
		return nil, err
	}
	listener, err := net.ListenUnix("unixpacket", addr)
	return listener, err
}

// func listen(end chan<- bool) {
// 	addr, err := net.ResolveUnixAddr("unix", "/tmp/foobar")
// 	if err != nil {
// 		fmt.Printf("Failed to resolve: %v\n", err)
// 		os.Exit(1)
// 	}

// 	list, err := net.ListenUnix("unix", addr)
// 	if err != nil {
// 		fmt.Printf("failed to listen: %v\n", err)
// 		os.Exit(1)
// 	}
// 	conn, _ := list.AcceptUnix()

// 	buf := make([]byte, 2048)
// 	n, uaddr, err := conn.ReadFromUnix(buf)
// 	if err != nil {
// 		fmt.Printf("LISTEN: Error: %v\n", err)
// 	} else {
// 		fmt.Printf("LISTEN: received %v bytes from %+v\n", n, uaddr)
// 		fmt.Printf("LISTEN: %v\n", string(buf))
// 	}

// 	conn.Close()
// 	list.Close()
// 	end <- true
// }

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
			sock.doReconnectSignal = make(chan bool)


			// attempt to open socket
			sock.socketListener, err = sock.createSocketListener(unixSocketPath)
			if err != nil {
				log.Error("UNIX SOCKET INITILIZATION ERROR: ", err)
				time.Sleep(time.Second * 2)
				continue
			}
			sock.socketConnection, err = sock.socketListener.Accept()
			if err != nil {
				log.Error("UNIX SOCKET ACCEPT ERROR: ", err)
				sock.socketConnection.Close()
				time.Sleep(time.Second * 2)
				continue
			}
			sock.socketOpen = true
			go sock.ReadUnixSocketAsync(1024)
			go sock.WriteUnixSocketAsync()
			select {
			case <-sock.doReconnectSignal:
				sock.socketConnection.Close()
				sock.socketListener.Close()
				sock.socketOpen = false
				continue
			case <-closeSocketSignal:
				sock.socketConnection.Close()
				sock.socketListener.Close()
				close(sock.socketWriteChannel)
				close(sock.socketReadChannel)
				sock.socketOpen = false
				return
			}
		}
	}()

	return sock
}
