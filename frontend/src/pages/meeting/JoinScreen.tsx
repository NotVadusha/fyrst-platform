import React, { useCallback, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { Button } from 'src/common/components/ui/common/Button';
import { createMeeting } from './common/api/meeting.api';

const JoinScreen = () => {
  const [meetingId, setMeetingId] = useState<string | undefined>();

  const navigate = useNavigate();

  const onCreate = async () => {
    console.log('here');
    const newMeetingId = await createMeeting();
    console.log('created new meeting');
    navigate(`/meeting-chat/${newMeetingId}`);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='grid grid-rows-3 gap-4'>
        <input
          type='text'
          placeholder='Enter Meeting Id'
          value={meetingId}
          onChange={event => setMeetingId(event.target.value)}
          className='mb-4 p-4 rounded-2xl bg-field text-body-default w-full opacity-50'
        />
        <Button variant='primary' onClick={() => navigate(`/meeting-chat/${meetingId}`)}>
          Join meeting
        </Button>
        <Button variant='primary' onClick={onCreate}>
          Create meeting
        </Button>
      </div>
    </div>
  );
};

export { JoinScreen };
