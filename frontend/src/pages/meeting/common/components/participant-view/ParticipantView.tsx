import React, { useRef, useMemo, useEffect } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import { MicOff, User } from 'lucide-react';
import { cn } from 'src/common/helpers/helpers';

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, isActiveSpeaker, setQuality } =
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

  console.log(isActiveSpeaker);

  return (
    <div
      key={participantId}
      className={cn('relative h-[227px]', { 'border border-green-2': isActiveSpeaker })}
    >
      <audio ref={micRef} autoPlay muted={isLocal} />

      {webcamOn ? (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={'100%'}
          width={'100%'}
          style={{ height: '100%' }}
          onError={error => {
            console.log(error, 'participant video error');
          }}
        />
      ) : (
        <div className='w-[350px] md:w-[378px] h-[calc(300px-4.6rem)] bg-grey flex items-center	 justify-center'>
          <User className='rounded-full w-[80px] h-[80px] bg-white' />
        </div>
      )}
      {!micOn && <MicOff className='w-6 h-6 absolute bottom-6 right-8 text-white' />}
    </div>
  );
};

export { ParticipantView };
