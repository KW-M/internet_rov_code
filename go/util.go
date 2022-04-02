package main

type UnblockSignal struct {
	err error;
	exitSignal chan bool;
	HasTriggered bool;
}

func newUnblockSignal() *UnblockSignal {
	p := UnblockSignal{exitSignal: make(chan bool), HasTriggered: false}
	return &p
}

func (e *UnblockSignal) Trigger() {
	if !e.HasTriggered {
		e.HasTriggered = true
		close(e.exitSignal)
	}
}

func (e *UnblockSignal) Wait() error {
	<-e.exitSignal
	return e.err
}

func (e *UnblockSignal) GetSignal() chan bool {
	return e.exitSignal
}

