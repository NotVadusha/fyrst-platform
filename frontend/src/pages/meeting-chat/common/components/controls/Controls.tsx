import React from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { Button } from 'src/common/components/ui/common/Button';

const Controls = () => {
  const { toggleMic, toggleWebcam, leave, localMicOn, localWebcamOn } = useMeeting();
  return (
    <div>
      <Button variant='primary' className='rounded-full mr-2' onClick={() => toggleMic()}>
        {localMicOn ? 'Volume On' : 'Volume Off'}
      </Button>
      <Button variant='primary' className='rounded-full mr-2' onClick={() => toggleWebcam()}>
        {localWebcamOn ? 'Webcam On' : 'Webcam Off'}
      </Button>
      <Button className='rounded-full bg-red hover:bg-red active:bg-red' onClick={() => leave()}>
        Leave
      </Button>
    </div>
  );
};

export { Controls };
