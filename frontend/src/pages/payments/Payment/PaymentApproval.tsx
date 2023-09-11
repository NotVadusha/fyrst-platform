import React, { useEffect } from 'react';
import { userRoles } from 'shared/packages/roles/userRoles';
import { Button } from 'src/common/components/ui/common/Button';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useAppSelector } from 'src/common/hooks/redux';
import { Payment } from 'src/common/packages/payments/types/models/Payment.model';
import { paymentsApi } from 'src/common/store/api/packages/payments/paymentApi';
import { profileApi } from 'src/common/store/api/packages/user-profile/userProfileApi';

type PaymentApprovalProps = {
  payment: Payment;
  roleId: number;
};

export const PaymentApproval: React.FC<PaymentApprovalProps> = ({ payment, roleId }) => {
  const [updatePayment, { isLoading }] = paymentsApi.useUpdatePaymentMutation();
  const [haveAccount, { data }] = profileApi.useLazyHaveStripeAccountQuery();

  const userId = useAppSelector(state => state.user.id);

  useEffect(() => {
    if (userId) haveAccount(userId);
  }, [userId]);

  const handleApproveClick = async () => {
    if (data?.stripeAccount)
      updatePayment({
        id: payment.id,
        body: {
          approved: true,
        },
      });
    else
      toast({
        variant: 'destructive',
        title: 'Payment approval',
        description: 'Connect your Stripe account to approve the payment',
      });
  };

  if (roleId === userRoles.WORKER && !payment?.approved)
    return (
      <Button
        className='w-[295px]'
        variant='primary'
        disabled={isLoading}
        onClick={handleApproveClick}
      >
        Approve
      </Button>
    );

  if (roleId === userRoles.WORKER && payment?.approved)
    return (
      <p className='text-body-large text-black font-semibold'>
        You&apos;ve already approved the payment
      </p>
    );

  return null;
};
