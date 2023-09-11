import React, { useCallback, useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Header } from '../../../../../common/components/ui/layout/Header/Header';

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
    <>
      <Header title='Interview' />
      <div className='flex items-center justify-center margin-auto mt-[150px] md:mt-[250px]'>
        <div className='grid grid-rows-3 gap-4 md:w-1/4'>
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
    </>
  );
};
export { JoinScreen };
