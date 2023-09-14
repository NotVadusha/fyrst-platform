import React from 'react';

import { CalendarGrid } from './CalendarGrid';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { selectUserId } from 'src/common/store/slices/packages/user/userSelectors';
import { Button } from 'src/common/components/ui/common/Button';
import { exportCalendar } from 'src/common/store/slices/packages/export-calendar/exportCalendarSlice';

export const CalendarPage = () => {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleExportCalendar = () => {
    dispatch(exportCalendar(userId || 1));
  };

  return (
    <>
      <Header title='Calendar' className='mb-10'>
        <div className='flex flex-1 justify-end mr-[-20px]'>
          <Button variant='secondary' onClick={handleExportCalendar}>
            Export calendar
          </Button>
        </div>
      </Header>

      <CalendarGrid userId={userId || 1}></CalendarGrid>
    </>
  );
};
