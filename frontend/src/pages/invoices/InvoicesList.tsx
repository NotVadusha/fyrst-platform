import React, { useEffect, useState } from 'react';
import styles from './InvoicesList.module.css';
import Table from '../../common/components/ui/common/Table/Table';
import { invoicesColumns } from './invoicesTableConfig';
import { useSearchParams } from 'react-router-dom';
import { InvoicesFiltersDto } from 'src/common/packages/invoices/types/dto/InvoicesFiltersDto';
import { InvoicesFilters } from './InvoicesFilters';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { invoicesApi } from 'src/common/store/api/packages/invoices/invoicesApi';

const LIMIT = 5;

const InvoicesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const filters: InvoicesFiltersDto = {
    minDate: searchParams.get('minDate'),
    maxDate: searchParams.get('maxDate'),
    payee: searchParams.get('payee'),
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof InvoicesFiltersDto] === null &&
      delete filters[key as keyof InvoicesFiltersDto];
  });

  const { data, isFetching } = invoicesApi.useGetAllInvoicesQuery(filters);

  let totalPages = 0;
  if (data) {
    totalPages = Math.ceil(data.total / LIMIT);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prevParams => {
      if (e.target.value) {
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
      if (value.length) {
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
    <div className={styles.invoicesContainer}>
      <div className={styles.invoicesHeader}>Invoices</div>
      <InvoicesFilters
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
      <div>
        {isFetching ? (
          <div className='flex justify-center min-h-[8rem]'>
            <Spinner size='lg' />
          </div>
        ) : data?.invoices?.length === 0 || data?.invoices === undefined ? (
          <p className='text-body-default font-semibold'>
            No invoices to display here. Most probably, nothing matches your search query
          </p>
        ) : (
          <>
            <Table
              items={data?.invoices || []}
              columns={invoicesColumns}
              getRowId={item => item.id}
            />
            <div className='flex justify-end my-6'>
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

export default InvoicesList;
