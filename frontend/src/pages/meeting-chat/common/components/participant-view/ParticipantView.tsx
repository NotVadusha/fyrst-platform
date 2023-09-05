import React, { useRef, useMemo, useEffect } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName, setQuality } =
    useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch(error => console.error('videoElem.current.play() failed', error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  useEffect(() => {
    setQuality('high');
  }, []);

  return (
    <div key={participantId}>
      <p>Participant: {displayName}</p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      <ReactPlayer
        playsinline
        pip={false}
        light={false}
        controls={false}
        muted={true}
        playing={true}
        url={videoStream}
        width={560}
        height={360}
        onError={error => {
          console.log(error, 'participant video error');
        }}
      />
    </div>
  );
};

export { ParticipantView };
