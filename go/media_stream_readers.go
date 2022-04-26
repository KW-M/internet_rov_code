package main

import (
	"time"

	"github.com/pion/webrtc/v3/pkg/media"
	"github.com/pion/webrtc/v3/pkg/media/ivfreader"
	"github.com/pion/webrtc/v3/pkg/media/oggreader"
	log "github.com/sirupsen/logrus"
)

///https://github.com/edaniels/gostream/blob/master/codec/x264/encoder.go
// https://github.com/pion/mediadevices/blob/08a396571f87ee2888fc855964a5442f2a163879/track.go#L314

func read_h264(pipe *NamedPipeMediaSource) {

	// from https://github.com/ashellunts/ffmpeg-to-webrtc/blob/master/src/main.go
	// Send our video a frame at a time. Pace our sending so we send it at the same speed it should be played back as.
	// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
	//
	// It is important to use a time.Ticker instead of time.Sleep because
	// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
	// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)

	// h264, h264Err := h264reader.NewReader(pipe.pipeFile)
	// if h264Err != nil {
	// 	log.Error("h264reader Initilization Error", h264Err)
	// 	pipe.exitReadLoopSignal.TriggerWithError(h264Err)
	// 	return
	// }

	// spsAndPpsCache := []byte{}
	// ticker := time.NewTicker(h264FrameDuration)
	// for {
	// 	select {
	// 	case <-pipe.exitReadLoopSignal.GetSignal():
	// 		return
	// 	case <-ticker.C:
	// 		nal, h264Err := h264.NextNAL()
	// 		if h264Err == io.EOF {
	// 			log.Println("All video frames parsed and sent")
	// 			// pipe.exitReadLoopSignal.Trigger()
	// 			// return
	// 			continue
	// 		} else if h264Err != nil {
	// 			log.Error("h264reader Decode Error: ", h264Err)
	// 			pipe.exitReadLoopSignal.TriggerWithError(h264Err)
	// 			return
	// 		}
	// 		nal.Data = append([]byte{0x00, 0x00, 0x00, 0x01}, nal.Data...)

	// 		if nal.UnitType == h264reader.NalUnitTypeSPS || nal.UnitType == h264reader.NalUnitTypePPS {
	// 			spsAndPpsCache = append(spsAndPpsCache, nal.Data...)
	// 			continue
	// 		} else if nal.UnitType == h264reader.NalUnitTypeCodedSliceIdr {
	// 			nal.Data = append(spsAndPpsCache, nal.Data...)
	// 			spsAndPpsCache = []byte{}
	// 		}

	// 		if h264WriteErr := cameraLivestreamVideoTrack.WriteSample(media.Sample{Data: nal.Data, Duration: time.Second}); h264WriteErr != nil {
	// 			log.Println("Error writing h264 video track sample: ", h264WriteErr)
	// 		}
	// 	}
	// }

	// naive implementation

	tmpReadBuf := make([]byte, 4096)
	ticker := time.NewTicker(h264FrameDuration)
	for {
		select {
		case <-pipe.exitReadLoopSignal.GetSignal():
			return
		case <-ticker.C:
			numBytes, err := pipe.pipeFile.Read(tmpReadBuf) // read as much data as possible
			if err != nil {
				log.Error("video reader error: ", err)
				pipe.exitReadLoopSignal.TriggerWithError(err)
				return
			}
			if numBytes == 0 {
				log.Println("All video frames parsed and sent")
			}

			// nal.Data = append([]byte{0x00, 0x00, 0x00, 0x01}, nal.Data...)

			// if nal.UnitType == h264reader.NalUnitTypeSPS || nal.UnitType == h264reader.NalUnitTypePPS {
			// 	spsAndPpsCache = append(spsAndPpsCache, nal.Data...)
			// 	continue
			// } else if nal.UnitType == h264reader.NalUnitTypeCodedSliceIdr {
			// 	nal.Data = append(spsAndPpsCache, nal.Data...)
			// 	spsAndPpsCache = []byte{}
			// }

			if h264WriteErr := cameraLivestreamVideoTrack.WriteSample(media.Sample{Data: tmpReadBuf, Duration: time.Second}); h264WriteErr != nil {
				log.Println("Error writing h264 video track sample: ", h264WriteErr)
			}
		}
	}
}

func read_ivf(pipe *NamedPipeMediaSource) {

	// from https://github.com/ashellunts/ffmpeg-to-webrtc/blob/master/src/main.go
	// Send our video a frame at a time. Pace our sending so we send it at the same speed it should be played back as.
	// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
	//
	// It is important to use a time.Ticker instead of time.Sleep because
	// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
	// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)

	ivfReader, ivfHeader, ivfErr := ivfreader.NewWith(pipe.pipeFile)
	if ivfErr != nil {
		log.Error("ivfReader Initilization Error", ivfErr)
		return
	}
	log.Warn("IVF READER NOT IMPLEMENTED!")
	print(ivfReader, ivfHeader)
}

func read_ogg(pipe *NamedPipeMediaSource) {

	// only works with opus codec in the ogg container
	// https://github.com/pion/webrtc/issues/2181
	oggReader, oggHeader, oggErr := oggreader.NewWith(pipe.pipeFile)
	if oggErr != nil {
		log.Error("oggReader Initilization Error", oggErr)
		return
	}
	log.Warn("OGG READER NOT IMPLEMENTED!")
	print(oggReader, oggHeader)
}

// // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264
// // Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// var h264PayloadType uint8 = 0
// for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 	if videoCodec.Name == "H264" {
// 		h264PayloadType = videoCodec.PayloadType
// 		break
// 	}
// }
// // if the payloadTypeNumber from never changed, the broswer doesn't support H264 (highly unlikely)
// if h264PayloadType == 0 {
// 	fmt.Println("Remote peer does not support H264")
// 	continue
// }
