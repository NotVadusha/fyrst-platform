import React, { MouseEvent, useEffect } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { useAppSelector } from 'src/common/hooks/redux';
import { stripeApi } from 'src/common/store/api/packages/stripe/stripeApi';
import { profileApi } from 'src/common/store/api/packages/user-profile/userProfileApi';

export const StripeConnection = () => {
  const userId = useAppSelector(state => state.user.id);

  const [getLink, { isFetching }] = stripeApi.useLazyGetAccountRegistrationLinkQuery();
  const [haveAccount, { data }] = profileApi.useLazyHaveStripeAccountQuery();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const linkResponse = await getLink(userId!).unwrap();
    window.location.assign(linkResponse.link);
  };

  useEffect(() => {
    if (userId) haveAccount(userId);
  }, [userId]);

  return (
    <div className='max-w-[512px] p-8 bg-white shadow-xl flex flex-col gap-4'>
      <p className='text-body-large text-blue font-semibold'>
        {data?.stripeAccount
          ? 'You already have connected Stripe account'
          : 'Connect stripe account to receive payouts'}
      </p>
      <Button variant='primary' onClick={handleClick} disabled={isFetching}>
        {data?.stripeAccount ? 'Reconnect Stripe Account' : 'Connect Stripe Account'}
      </Button>
    </div>
  );
};
