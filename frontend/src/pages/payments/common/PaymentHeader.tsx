import React, { MouseEvent } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useAppSelector } from 'src/common/hooks/redux';
import { stripeApi } from 'src/common/store/api/packages/stripe/stripeApi';

export const PaymentHeader = () => {
  const userId = useAppSelector(state => state.user.id);

  const [getLink] = stripeApi.useLazyGetAccountRegistrationLinkQuery();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const linkResponse = await getLink(userId!).unwrap();
    window.location.assign(linkResponse.link);
  };

  return (
    <Header title='Payments'>
      <div className='flex flex-1 justify-end'>
        <Button variant='primary' onClick={handleClick}>
          Connect Stripe Account
        </Button>
      </div>
    </Header>
  );
};
