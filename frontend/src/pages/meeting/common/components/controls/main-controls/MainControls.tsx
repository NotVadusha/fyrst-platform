import React from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { Button } from 'src/common/components/ui/common/Button';
import { ReactComponent as MicOnIcon } from 'src/assets/icons/mic-on.svg';
import { ReactComponent as MicOffIcon } from 'src/assets/icons/mic-off.svg';
import { ReactComponent as CameraOnIcon } from 'src/assets/icons/camera-on.svg';
import { ReactComponent as CameraOffIcon } from 'src/assets/icons/camera-off.svg';
import { ReactComponent as LeaveCallIcon } from 'src/assets/icons/leave-call.svg';

const MainControls = () => {
  const { toggleMic, toggleWebcam, leave, localMicOn, localWebcamOn } = useMeeting();
  return (
    <div className='flex align-center items-center'>
      <Button variant='controls' size='controls' className='mr-6' onClick={() => toggleMic()}>
        {localMicOn ? <MicOnIcon /> : <MicOffIcon />}
      </Button>
      <Button variant='controls' size='controls' className='mr-6' onClick={() => toggleWebcam()}>
        {localWebcamOn ? <CameraOnIcon /> : <CameraOffIcon />}
      </Button>
      <Button
        className='bg-red hover:bg-red'
        variant='controls'
        size='controls'
        onClick={() => leave()}
      >
        <LeaveCallIcon />
      </Button>
    </div>
  );
};

export { MainControls };
