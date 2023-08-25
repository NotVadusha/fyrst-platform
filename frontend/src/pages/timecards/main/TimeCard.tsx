import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import Table from 'src/ui/common/Table/Table';
import { TimecardFiltersForm } from './TimecardFiltersForm';
import { timecardsTableColumns } from './timecards-table-config';
import { useFetchTimecardsQuery } from '../../../store/services/apiSlice';
import { useSearchParams } from 'react-router-dom';
import { TimecardFilters } from '../../../../types/TimecardFilters';
import { Spinner } from 'src/ui/common/Spinner/Spinner';

const LIMIT = 5;

const TimeCardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const filters: TimecardFilters = {
    createdAt: searchParams.get('createdAt'),
    approvedAt: searchParams.get('approvedAt'),
    approvedBy: searchParams.get('approvedBy'),
    status: searchParams.get('status'),
    createdBy: searchParams.get('createdBy'),
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof TimecardFilters] === null && delete filters[key as keyof TimecardFilters];
  });

  const { data, isFetching } = useFetchTimecardsQuery(filters);

  let totalPages = 0;
  if (data) {
    totalPages = Math.ceil(data.total / LIMIT);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(prevParams => {
      if (e.target.value === '') {
        prevParams.delete(e.target.name);
      } else {
        prevParams.set(e.target.name, e.target.value);
      }

      return prevParams;
    });
  }

  return (
    <section className='min-h-full'>
      <Header title='Timecards'>
        <div className='flex flex-1 justify-end'>
          <div className='flex gap-x-4'>
            <Button type='secondary' label='Export CSV' eventName='dummy' />
            <Link to='.'>
              <Button type='primary' label='Create booking' eventName='dummy' />
            </Link>
          </div>
        </div>
      </Header>

      <div className='px-20 py-10 flex flex-col gap-y-6'>
        <h5 className='text-h5 text-dark-grey font-semibold'>Timecards</h5>
        <TimecardFiltersForm handleInputChange={handleInputChange} />
        {isFetching ? (
          <div className='flex justify-center min-h-[8rem]'>
            <Spinner size='lg' />
          </div>
        ) : data?.items.length === 0 ? (
          <p className='text-body-default font-semibold'>
            No timecards to display here. Most probably, nothing matches your search query
          </p>
        ) : (
          <>
            <Table
              columns={timecardsTableColumns}
              items={data ? data.items : []}
              getRowId={item => item.id}
            />

            <div className='flex justify-end'>
              {totalPages > 1 && (
                <Pagination
                  totalCount={totalPages}
                  siblingsCount={2}
                  value={page}
                  onChange={currentPage => {
                    setPage(currentPage);

                    const nextOffset = (currentPage - 1) * LIMIT;
                    setSearchParams(prevParams => {
                      prevParams.set('limit', String(LIMIT));
                      prevParams.set('offset', String(nextOffset));
                      return prevParams;
                    });
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TimeCardPage;
