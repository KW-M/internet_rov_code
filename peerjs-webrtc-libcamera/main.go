// +build linux

package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"flag"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

func main() {
	// Parse the flags passed to program
	// videoShellCommand := ""
	// httpListenPort := ""
	// flag.StringVar(&videoShellCommand, "", "Shell command that will start generating h264 stream", "", "path to the media file you want to playback")
	// flag.StringVar(&httpListenAddress, "udp-video-listen-address", "http://localhost:8080", "Port number to pull the video stream from. Default is http://localhost:8080")
	// flag.StringVar(&httpListenAddress, "websocket-listen-port", ":8181", "Port number for websocket HTTP server to listen on. Default is :8181")
	// flag.Parse()

	// Create a simple boolean "channel" that go subroutine functions can use to signal that they are done processing:
	done := make(chan bool)

	setupWebrtcConnection(done)

	// Wait for the done channel to be closed at which point the catchShutdown function will unpause the wait group:
	wg := &sync.WaitGroup{}
	wg.Add(1)
	catchShutdown(done, wg)
	wg.Wait()

	// sleep a Second at very end to allow everything to finish.
	time.Sleep(time.Second)
}

func catchShutdown(done chan bool, wg *sync.WaitGroup) {
	ch := make(chan os.Signal, 1) // Create a channel to listen for an interrupt signal from the OS.
	go func() {
		for {
			select {
			case <-done:
				wg.Done()
				return
			case <-ch:
				log.Println("ctrl+c or other system interrupt received")
				close(done)
				wg.Done()
				return
			}
		}
	}()
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM, syscall.SIGHUP)
}