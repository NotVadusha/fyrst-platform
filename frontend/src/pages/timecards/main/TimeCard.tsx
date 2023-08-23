import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import Table from 'src/ui/common/Table/Table';
import { TimecardFiltersForm } from './TimecardFiltersForm';
import { timecardsMock, timecardsTableColumns } from './timecards-table-config';

const TimeCardPage = () => {
  const timecards = timecardsMock;

  return (
    <section className='min-h-full'>
      <Header title='Timecards'>
        <div className='flex flex-1 justify-end'>
          <div className='flex gap-x-4'>
            <Button type='secondary' label='Export CSV' eventName='dummy' />
            <Link to='create'>
              <Button type='primary' label='Create new timecard' eventName='dummy' />
            </Link>
          </div>
        </div>
      </Header>
      <div className='px-20 py-10 flex flex-col gap-y-6'>
        <h5 className='text-h5 text-dark-grey font-semibold'>Timecards</h5>
        <TimecardFiltersForm />
        {timecards.length > 0 ? (
          <Table columns={timecardsTableColumns} items={timecardsMock} getRowId={item => item.id} />
        ) : (
          <p className='text-body-default font-semibold'>
            No timecards to display here. Most probably, nothing matches your search query
          </p>
        )}
        <div className='flex justify-end'>
          {timecards.length > 0 && (
            <Pagination
              totalCount={10}
              siblingsCount={2}
              value={1}
              onChange={_ => {
                return;
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TimeCardPage;
