import React, { FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { Button } from 'src/common/components/ui/common/Button';

const PaymentComponent = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardElement = elements?.getElement(CardNumberElement);

    const token = await stripe?.createToken(cardElement!);

    console.log(token);
  };

  return (
    <div className='w-[955px] mx-auto mt-[80px]'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <CardNumberElement />
        <CardExpiryElement />
        <Button variant='primary' type='submit'>
          Get token
        </Button>
      </form>
    </div>
  );
};

export const PaymentGateway = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};
