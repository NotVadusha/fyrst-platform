import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import Table from 'src/ui/common/Table/Table';
import { TimecardFiltersForm } from './TimecardFiltersForm';
import { timecardsMock, timecardsTableColumns } from './timecards-table-config';
import { useFetchTimecardsQuery } from '../../../store/features/apiSlice';
import { useSearchParams } from 'react-router-dom';
import { TimecardFilters } from '../../../../types/TimecardFilters';
import { Spinner } from 'src/ui/common/Spinner/Spinner';

const TimeCardPage = () => {
  const timecards = timecardsMock;
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: TimecardFilters = {
    createdAt: searchParams.get('createdAt'),
    approvedAt: searchParams.get('approvedAt'),
    approvedBy: searchParams.get('approvedBy'),
    status: searchParams.get('status'),
    createdBy: searchParams.get('createdBy'),
    limit: searchParams.get('limit'),
    offset: searchParams.get('offset'),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof TimecardFilters] === null && delete filters[key as keyof TimecardFilters];
  });

  const { data, isFetching } = useFetchTimecardsQuery(filters);

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
        <TimecardFiltersForm handleInputChange={_ => console.log('dummy')} />
        {isFetching ? (
          <div className='flex justify-center min-h-[8rem]'>
            <Spinner size='lg' />
          </div>
        ) : data?.items.length === 0 ? (
          <p className='text-body-default font-semibold'>
            No timecards to display here. Most probably, nothing matches your search query
          </p>
        ) : (
          <Table
            columns={timecardsTableColumns}
            items={data ? data.items : []}
            getRowId={item => item.id}
          />
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
