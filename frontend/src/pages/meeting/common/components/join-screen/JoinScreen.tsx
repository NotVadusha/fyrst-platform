import React, { useCallback, useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';

const JoinScreen = ({
  getMeetingAndToken,
  handleCreate,
}: {
  getMeetingAndToken: (meeting?: string) => void;
  handleCreate: () => void;
}) => {
  const [meetingId, setMeetingId] = useState<string | undefined>();

  const onJoinClick = async () => {
    getMeetingAndToken(meetingId);
  };

  const onCreateClick = async () => {
    handleCreate();
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingId(event.target.value);
  }, []);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='grid grid-rows-3 gap-4 w-1/4'>
        <input
          type='text'
          placeholder='Enter Meeting Id'
          onChange={handleChange}
          className='mb-4 p-4 rounded-2xl bg-field text-body-default w-full opacity-50'
        />
        <Button variant='primary' onClick={onJoinClick}>
          Join meeting
        </Button>
        <Button variant='primary' onClick={onCreateClick}>
          Create meeting
        </Button>
      </div>
    </div>
  );
};
export { JoinScreen };
