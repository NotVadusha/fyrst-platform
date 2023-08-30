import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import Table from 'src/common/components/ui/common/Table/Table';
import { TimecardFiltersForm } from './TimecardFiltersForm';
import { timecardsTableColumns } from './timecardsTableConfig';
import { useFetchTimecardsQuery } from 'src/common/store/reducers/timecards/timecardsApi';
import { useSearchParams } from 'react-router-dom';
import { TimecardFiltersDto } from 'src/common/types/dto/TimecardFiltersDto';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

const LIMIT = 5;

const TimeCardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const filters: TimecardFiltersDto = {
    createdAt: searchParams.get('createdAt'),
    approvedAt: searchParams.get('approvedAt'),
    approvedBy: searchParams.get('approvedBy'),
    status: searchParams.get('status'),
    createdBy: searchParams.get('createdBy'),
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof TimecardFiltersDto] === null &&
      delete filters[key as keyof TimecardFiltersDto];
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

      setPage(1);
      return prevParams;
    });
  }

  function handleSelectChange(value: string, param: string) {
    setSearchParams(prevParams => {
      if (value.length === 0) {
        prevParams.delete(param);
      } else {
        prevParams.set(param, value);
      }

      setPage(1);
      return prevParams;
    });
  }

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <section className='min-h-full'>
      <Header title='Timecards'>
        <div className='flex flex-1 justify-end'>
          <div className='flex gap-x-4'>
            <Button variant='secondary'>Export CSV</Button>
            <Link to='/booking/create'>
              <Button variant='primary'>Create new booking</Button>
            </Link>
          </div>
        </div>
      </Header>

      <div className='px-20 py-10 flex flex-col gap-y-6'>
        <h5 className='text-h5 text-dark-grey font-semibold'>Timecards</h5>
        <TimecardFiltersForm
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
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
