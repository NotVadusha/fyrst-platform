import React, { useEffect, useState } from 'react';
import styles from './PaymentsList.module.css';
import Table from '../../../common/components/ui/common/Table/Table';
import { paymentsApi } from 'src/common/store/api/packages/payments/paymentApi';
import { paymentsColumns } from './paymentsTableConfig';
import { useSearchParams } from 'react-router-dom';
import { PaymentsFiltersDto } from 'src/common/packages/payments/types/dto/PaymentsFiltersDto';
import { PaymentsFilters } from './PaymentsFilters';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { RefreshButton } from '../../../common/components/ui/common/Button/common/refresh-button/RefreshButton';

const LIMIT = 5;

const PaymentsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const filters: PaymentsFiltersDto = {
    minDate: searchParams.get('minDate'),
    maxDate: searchParams.get('maxDate'),
    worker: searchParams.get('worker'),
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof PaymentsFiltersDto] === null &&
      delete filters[key as keyof PaymentsFiltersDto];
  });

  const { data, isFetching } = paymentsApi.useGetAllPaymentsQuery(filters);

  let totalPages = 0;
  if (data) {
    totalPages = Math.ceil(data.total / LIMIT);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prevParams => {
      if (!e.target.value) {
        prevParams.delete(e.target.name);
      } else {
        prevParams.set(e.target.name, e.target.value);
      }

      setPage(1);
      return prevParams;
    });
  };

  const handleSelectChange = (value: string, param: string) => {
    setSearchParams(prevParams => {
      if (!value.length) {
        prevParams.delete(param);
      } else {
        prevParams.set(param, value);
      }

      setPage(1);
      return prevParams;
    });
  };

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <div className='container lg:max-w-[955px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10 space-y-6'>
      <div className='flex items-center justify-between'>
        <h5 className='text-h5 text-dark-grey font-semibold'>Payments</h5>
        <RefreshButton />
      </div>

      <PaymentsFilters
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
      <div>
        {isFetching ? (
          <div className='flex justify-center min-h-[8rem]'>
            <Spinner size='lg' />
          </div>
        ) : data?.payments?.length === 0 || data?.payments === undefined ? (
          <p className='text-body-default font-semibold'>
            No payments to display here. Most probably, nothing matches your search query
          </p>
        ) : (
          <>
            <Table
              items={data?.payments || []}
              columns={paymentsColumns}
              getRowId={item => item.id}
            />
            <div className='md:flex md:justify-end my-6'>
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
    </div>
  );
};

export default PaymentsList;
