import React from 'react';

import { CalendarGrid } from './CalendarGrid';
import { Header } from 'src/common/components/ui/layout/Header/Header';

export const CalendarPage = () => {
  return (
    <>
      <Header title='Calendar'></Header>
      <CalendarGrid></CalendarGrid>
    </>
  );
};
