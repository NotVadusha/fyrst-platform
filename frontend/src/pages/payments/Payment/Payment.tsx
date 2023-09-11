import React, { useEffect } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { PaymentHeader } from '../common/PaymentHeader';
import styles from './Payment.module.css';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import Table from 'src/common/components/ui/common/Table/Table';
import { taxesColumns } from './taxesTableConfig';
import { getTaxes } from './taxes';
import { useAppSelector } from 'src/common/hooks/redux';
import { userRoles } from 'shared/packages/roles/userRoles';
import { paymentsApi } from 'src/common/store/api/packages/payments/paymentApi';
import { Navigate, useParams } from 'react-router-dom';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { PaymentApproval } from './PaymentApproval';
import { PaymentGateway } from './PaymentGateway';

export const Payment = () => {
  const { id: paramsId } = useParams<{ id: string }>();

  const total = 12412;
  const taxes = getTaxes(total);

  const roleId = useAppSelector(state => state.user.role_id);

  const {
    data: payment,
    isFetching: isPaymentFetching,
    isError: isFetchPaymentError,
  } = paymentsApi.useGetPaymentQuery(+paramsId!);

  if (isPaymentFetching)
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );

  if (isFetchPaymentError) return <Navigate to='/payments' />;

  return (
    <>
      <PaymentHeader />
      <div className={styles.paymentContainer}>
        <GoBackButton path='/payments' className='text-dark-grey'>
          All payments
        </GoBackButton>
        <h3 className='text-h3 text-black font-bold mt-5'>Taxes overview</h3>
        <p className='text-body-large text-black font-normal mt-[18px]'>
          The payment before tax collection is $ <span className='underline'>{total}</span>. Here is
          a list of all taxes and your payment after the taxes collection.
          {roleId === userRoles.WORKER
            ? ' If you agree, click the ‘Approve’ button, and you will be paid in a few days.'
            : null}
        </p>
        <div className='mt-10 mb-12'>
          <Table items={taxes} columns={taxesColumns} getRowId={item => item.id} />
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
