import React, { MouseEvent, useEffect } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useAppSelector } from 'src/common/hooks/redux';
import { stripeApi } from 'src/common/store/api/packages/stripe/stripeApi';
import { profileApi } from 'src/common/store/api/packages/user-profile/userProfileApi';

export const PaymentHeader = () => {
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
    <Header title='Payments'>
      <div className='flex flex-1 justify-end gap-4 items-center'>
        {data?.stripeAccount ? (
          <p className='text-body-large text-black font-normal'>You already have Stripe account</p>
        ) : null}
        <Button variant='primary' onClick={handleClick} disabled={isFetching}>
          {data?.stripeAccount ? 'Reconnect Stripe Account' : 'Connect Stripe Account'}
        </Button>
      </div>
    </Header>
  );
};
