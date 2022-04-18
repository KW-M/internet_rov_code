package main

import (
	"net"
	"os"
	"time"

	log "github.com/sirupsen/logrus"
)

/*
 * UnixSocketRelay
 * Go class for sending and reciving messages to / from another program via a unix domain socket.
 * Opens a socket server in SOCK_SEQ_PACKET mode at the given path and listens for connections.
 * Will keep trying to reopen the socket if it is closed / has problems until the passed closeSocketSignal is triggered.
 * Relays all messages from the messagesToSocket go channel to the socket
 * and relays all messages from the socket to the messagesFromSocket go channel.
 */
type UnixSocketRelay struct {
	socketConnection      net.Conn
	socketListener        net.Listener
	exitSocketLoopsSignal *UnblockSignal
	messagesToSocket      chan string
	messagesFromSocket    chan string
	readBufferSize        int
	debugLog              *log.Entry
}

/* ReadUnixSocketAsync (blocking goroutine)
 * will push all recved messages as a string onto the messagesFromSocket channel */
func (sock *UnixSocketRelay) ReadUnixSocketAsync() {
	buf := make([]byte, sock.readBufferSize)
L:
	for {
		sock.debugLog.Debug("Reading sock Loop...")
		select {
		case <-sock.exitSocketLoopsSignal.GetSignal():
			break L
		default:
			conn := sock.socketConnection
			conn.SetReadDeadline(time.Now().Add(time.Second * 10))
			numBytes, err := conn.Read(buf)
			if sock.exitSocketLoopsSignal.HasTriggered {
				break L
			} else if err != nil {
				sock.debugLog.Warn("Connection read error:", err)
				sock.exitSocketLoopsSignal.Trigger()
				break L
			}

			// extract the string message (as a slice of bytes) from the buffer
			message := string(buf[0:numBytes])
			sock.messagesFromSocket <- message
		}
	}
	sock.debugLog.Info("Exiting reading unix socket loop...")
}

/* WriteUnixSocketAsync (blocking goroutine)
 * will wait for messages on the messagesToSocket channel and send them to the socket in utf-8 encoded bytes */
func (sock *UnixSocketRelay) WriteUnixSocketAsync() {
L:
	for {
		sock.debugLog.Debug("Writing sock Loop...")
		select {
		case <-sock.exitSocketLoopsSignal.GetSignal():
			break L
		case msg, chanIsOpen := <-sock.messagesToSocket:
			log.Print("Writing to socket: ", msg, chanIsOpen)
			if chanIsOpen && msg != "" {
				sock.socketConnection.SetWriteDeadline(time.Now().Add(time.Second * 10))
				_, err := sock.socketConnection.Write([]byte(msg))
				if err != nil {
					sock.debugLog.Warn("Connection write error: ", err)
					sock.exitSocketLoopsSignal.Trigger()
					break L
				}
			}
		}
	}
	sock.debugLog.Info("Exiting writing unix socket loop...")
}

/* cleanupSocketServer
 * Closes any open socket connection & socket listener */
func (sock *UnixSocketRelay) cleanupSocketServer() {
	sock.debugLog.Info("Cleaning up unix socket server.")
	sock.exitSocketLoopsSignal.Trigger()
	if sock.socketConnection != nil {
		sock.socketConnection.Close()
	}
	if sock.socketListener != nil {
		sock.socketListener.Close()
	}
}

/* startSocketServer (blocking goroutine)
 * starts listening on a unix domain socket at the given file path using the SOCK_SEQPACKET socket format.
 * PARAM: unixSocketPath is the file path of the unix socket to create (eg. "/tmp/whatever.socket").
 */
func (sock *UnixSocketRelay) startSocketServer(unixSocketPath string) {

	// exit gracefully if the goroutine panics by calling CleanupSocket()
	defer func() {
		if r := recover(); r != nil {
			sock.debugLog.Info("Recovered from panic in startSocketServer()...", r)
		}
		sock.cleanupSocketServer()
	}()

	// attempt to remove the socket file if it already exists:
	if _, err := os.Stat(unixSocketPath); err == nil {
		// try to remove any old socket file if it is still exists
		err := os.Remove(unixSocketPath)
		if err != nil {
			sock.debugLog.Warn("ERROR REMOVING EXISTING UNIX SOCKET FILE: ", err)
		}
	}

	// get a reference to the unix socket given the socket file location
	addr, err := net.ResolveUnixAddr("unixpacket", unixSocketPath)
	if err != nil {
		sock.debugLog.Error("Error resolving socket path: ", err)
		return
	}

	// create the socket file and listen for connections
	sock.socketListener, err = net.ListenUnix("unixpacket", addr)
	if err != nil {
		sock.debugLog.Error("Listen error: ", err)
		return
	}

	// wait for some program to connect to the socket (blocking)
	sock.debugLog.Info("Listening for connection...")
	sock.socketConnection, err = sock.socketListener.Accept()
	if err != nil {
		sock.debugLog.Error("Accept connection error: ", err)
		return
	}

	// start the goroutines that will relay messages to/from the socket
	go sock.ReadUnixSocketAsync()
	go sock.WriteUnixSocketAsync()

	sock.debugLog.Println("Unix socket open! Listening for messages on: ", unixSocketPath)
	sock.exitSocketLoopsSignal.Wait()

}

/* CreateUnixSocketRelay
 * starts listening on a unix domain socket at the particular address using the SOCK_SEQPACKET socket format.
 * PARAM: closeSocketSignal is the UnblockSignal that will signal to this goroutine to cleanup & close the socket.
 * PARAM: messagesFromSocket is a buffered string channel. When a message is recived on the socket it will be sent to this channel.
 * PARAM: messagesToSocket is a buffered string channel. When a message is sent on this channel, it will be sent to the socket.
 * PARAM: unixSocketPath is the path the unix socket to connect to (eg. "/tmp/whatever.sock").
 * PARAM: readBufferSize is the size of the read buffer for the socket connection.
 * RETURNS: a UnixSocketRelay struct that is the new relay for the unix socket.
 */
func CreateUnixSocketRelay(closeSocketSignal *UnblockSignal, messagesFromSocket *chan string, messagesToSocket *chan string, unixSocketPath string, readBufferSize int) *UnixSocketRelay {
	sock := new(UnixSocketRelay)
	sock.messagesToSocket = *messagesToSocket
	sock.messagesFromSocket = *messagesFromSocket
	sock.readBufferSize = readBufferSize
	sock.debugLog = log.WithFields(log.Fields{"uSocket": unixSocketPath})

	go func() {
		for {
			select {
			case <-closeSocketSignal.GetSignal():
				sock.exitSocketLoopsSignal.Trigger()
				return
			default:
				sock.exitSocketLoopsSignal = newUnblockSignal()
				sock.startSocketServer(unixSocketPath)
				time.Sleep(time.Second) // wait a second before trying to reconnect
			}
		}
	}()

	return sock
}
