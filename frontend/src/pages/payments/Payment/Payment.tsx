import React, { useEffect, useState } from 'react';
import styles from './Payment.module.css';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import Table from 'src/common/components/ui/common/Table/Table';
import { taxesColumns } from './helpers/taxesTableConfig';
import { useAppSelector } from 'src/common/hooks/redux';
import { userRoles } from 'shared/packages/roles/userRoles';
import { paymentsApi } from 'src/common/store/api/packages/payments/paymentApi';
import { Navigate, useParams } from 'react-router-dom';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { PaymentApproval } from './PaymentApproval';
import { PaymentGateway } from './PaymentGateway';
import { taxApi } from 'src/common/store/api/packages/tax/taxApi';
import { TaxCell } from 'src/common/packages/payments/types/models/TaxCell.model';
import { getTableCells } from './helpers/getTableCells';
import { Header } from 'src/common/components/ui/layout/Header/Header';

export const Payment = () => {
  const { id: paramsId } = useParams<{ id: string }>();
  const [taxesCells, setTaxesCells] = useState<TaxCell[]>([]);
  const [total, setTotal] = useState<number>(0);

  const roleId = useAppSelector(state => state.user.role_id);

  const {
    data: payment,
    isFetching: isPaymentFetching,
    isError: isFetchPaymentError,
  } = paymentsApi.useGetPaymentQuery(+paramsId!);
  const { data: taxes } = taxApi.useGetTaxesQuery(+paramsId!);

  useEffect(() => {
    if (taxes && payment) {
      const tableCells = getTableCells(payment, taxes);
      const total =
        tableCells[tableCells.length - 1].amount + tableCells[tableCells.length - 2].amount;
      setTaxesCells(tableCells);
      setTotal(total);
    }
  }, [taxes, payment]);

  if (isPaymentFetching)
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );

  if (isFetchPaymentError) return <Navigate to='/payments' />;

  return (
    <>
      <Header title='Payments' />
      <div className={styles.paymentContainer}>
        <GoBackButton path='/payments' className='text-dark-grey'>
          All payments
        </GoBackButton>
        <h3 className='text-h3 text-black font-bold mt-5'>Taxes overview</h3>
        <p className='text-body-large text-black font-normal mt-[18px]'>
          The payment before tax collection is $
          <span className='underline'>{Math.round(total * 100) / 100}</span>. Here is a list of all
          taxes and your payment after the taxes collection.
          {roleId === userRoles.WORKER
            ? ' If you agree, click the ‘Approve’ button, and you will be paid in a few days.'
            : null}
        </p>
        <div className='mt-10 mb-12'>
          <Table items={taxesCells} columns={taxesColumns} getRowId={item => item.id} />
        </div>
        <PaymentApproval payment={payment!} roleId={roleId!} />
        {roleId === userRoles.FACILITY_MANAGER && !payment?.approved && !isPaymentFetching ? (
          <p className='text-body-large text-black font-semibold'>
            This payment hasn&apos;t been approved by the employee yet
          </p>
        ) : null}
        {roleId === userRoles.FACILITY_MANAGER && payment?.approved && !isPaymentFetching ? (
          <PaymentGateway paymentId={payment.id} paid={payment.status === 'completed'} />
        ) : null}
      </div>
    </>
  );
};
