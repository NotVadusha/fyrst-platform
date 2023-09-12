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
import { taxApi } from 'src/common/store/api/packages/tax/taxApi';
import { TaxCell } from 'src/common/packages/payments/types/models/TaxCell.model';
import { getTableCells } from './helpers/getTableCells';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { CardModal } from './CardModal';
import { Button } from 'src/common/components/ui/common/Button';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { profileApi } from 'src/common/store/api/packages/user-profile/userProfileApi';
import { ReactComponent as SpinnerSvg } from 'src/assets/icons/spinner.svg';

export const Payment = () => {
  const { id: paramsId } = useParams<{ id: string }>();
  const [taxesCells, setTaxesCells] = useState<TaxCell[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cardModalVisibility, setCardModalVisibility] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>();

  const roleId = useAppSelector(state => state.user.role_id);
  const userId = useAppSelector(state => state.user.id);

  const {
    data: payment,
    isFetching: isPaymentFetching,
    isError: isFetchPaymentError,
  } = paymentsApi.useGetPaymentQuery(+paramsId!);
  const { data: taxes } = taxApi.useGetTaxesQuery(+paramsId!);
  const [updatePayment, { isLoading }] = paymentsApi.useUpdatePaymentMutation();
  const [haveAccount, { data }] = profileApi.useLazyHaveStripeAccountQuery();

  useEffect(() => {
    if (userId) haveAccount(userId);
  }, [userId]);

  const handleApproveClick = async () => {
    if (roleId === userRoles.FACILITY_MANAGER || isLoading) return;
    if (data?.stripeAccount) {
      if (payment) {
        updatePayment({
          id: payment.id!,
          body: {
            approved: true,
          },
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Payment approval',
        description: 'Connect your Stripe account to approve the payment',
      });
    }
  };

  useEffect(() => {
    if (taxes && payment) {
      const tableCells = getTableCells(payment, taxes);
      const total =
        tableCells[tableCells.length - 1].amount + tableCells[tableCells.length - 2].amount;
      setTaxesCells(tableCells);
      setTotal(total);
      setIsPaid(payment.status === 'completed');
    }
  }, [taxes, payment]);

  if (isPaymentFetching)
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );

  if (isFetchPaymentError) return <Navigate to='/payments' />;

  const approvingButtonContent = (
    <div className='flex flex-row items-center gap-2.5'>
      <SpinnerSvg className='animate-[spin_4s_linear_infinite] w-5 h-5' />
      <p className='text-base leading-4'>Approving</p>
    </div>
  );

  return (
    <>
      <Header title='Payments' />
      <div className={styles.paymentContainer}>
        <div className='flex flex-row justify-between'>
          <GoBackButton path='/payments' className='text-dark-grey'>
            All payments
          </GoBackButton>

          <div className='flex flex-row gap-6'>
            {roleId === userRoles.FACILITY_MANAGER && !isPaymentFetching ? (
              <Button
                variant='primary'
                className='w-[154px] px-4'
                onClick={() => setCardModalVisibility(true)}
                disabled={isPaid || !payment?.approved}
              >
                {isPaid ? 'Payed' : 'Make a payment'}
              </Button>
            ) : null}

            <Button
              className='w-[154px]'
              variant='primary'
              disabled={payment?.approved}
              onClick={handleApproveClick}
            >
              {roleId === userRoles.FACILITY_MANAGER && !payment?.approved
                ? approvingButtonContent
                : null}
              {roleId === userRoles.WORKER && !payment?.approved && !isLoading ? 'Approve' : null}
              {roleId === userRoles.WORKER && isLoading ? approvingButtonContent : null}
              {payment?.approved && !isLoading ? 'Approved' : null}
            </Button>
          </div>
        </div>
        <h3 className='text-h3 text-black font-bold mt-5'>Taxes overview</h3>
        <p className='text-body-large text-black font-normal mt-[18px]'>
          The payment before tax collection is $
          <span className='underline'>{Math.round(total * 100) / 100}</span>. Here is a list of all
          taxes and your payment after the taxes collection.
        </p>
        <div className='mt-10 mb-12'>
          <Table items={taxesCells} columns={taxesColumns} getRowId={item => item.id} />
        </div>
        <CardModal
          onOpenChange={setCardModalVisibility}
          open={cardModalVisibility}
          paymentId={payment!.id}
          onPaymentComplete={setIsPaid}
        />
      </div>
    </>
  );
};
