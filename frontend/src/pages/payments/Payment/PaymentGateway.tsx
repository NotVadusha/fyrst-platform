import React, { FormEvent, useEffect, useState } from 'react';
import { StripeElementChangeEvent, loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { Button } from 'src/common/components/ui/common/Button';
import styles from './Payment.module.css';
import { CardElementWrapper } from './CardElementWrapper';
import { stripeApi } from 'src/common/store/api/packages/stripe/stripeApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { apiSlice } from 'src/common/store/api/api';
import { useAppDispatch } from 'src/common/hooks/redux';

type PaymentProps = {
  paymentId: number;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardDetails: React.FC<PaymentProps> = ({ paymentId, onOpenChange }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const [isProceeding, setIsProceeding] = useState<boolean>(false);

  const [initIntent] = stripeApi.useLazyInitializeIntentQuery();

  const [cardErrors, setCardErrors] = useState<string>();
  const [cardFocus, setCardFocus] = useState<boolean>(false);
  const [cvcErrors, setCvcErrors] = useState<string>();
  const [cvcFocus, setCvcFocus] = useState<boolean>(false);
  const [expireErrors, setExpireErrors] = useState<string>();
  const [expireFocus, setExpireFocus] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cardErrors || cvcErrors || expireErrors || !stripe || !elements) return;

    const cardElement = elements?.getElement(CardNumberElement);

    setIsProceeding(true);

    try {
      const intent = await initIntent(paymentId).unwrap();
      const { client_secret } = intent;
      const paymentIntent = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement!,
        },
      });
      if (paymentIntent) {
        toast({
          variant: 'default',
          title: 'Payment',
          description: 'Payment was successful',
        });
        dispatch(apiSlice.util.invalidateTags(['Payments', 'Payment']));
        onOpenChange(false);
      } else {
        throw new Error();
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Payment',
        description: 'Payment is failed',
      });
      setIsProceeding(false);
    }
  };

  const handleCardChange =
    (setState: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (e: StripeElementChangeEvent) => {
      setState(e.error?.message);
    };

  const inputStyle = {
    base: {
      iconColor: '#083D77',
      color: '#083D77',
      fontWeight: 500,
      fontFamily: "'Mukta', sans-serif",
      fontSize: '14px',
      lineHeight: '20px',
    },
    invalid: {
      color: '#4C5767',
    },
  };

  const getStripeElementProps = (
    setErrorsState: React.Dispatch<React.SetStateAction<string | undefined>>,
    setFocusState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => ({
    className: styles.cardInputElement,
    options: {
      style: inputStyle,
    },
    onChange: handleCardChange(setErrorsState),
    onFocus: () => setFocusState(true),
    onBlur: () => setFocusState(false),
  });

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <CardElementWrapper label='Card number' focus={cardFocus} error={cardErrors}>
            <CardNumberElement {...getStripeElementProps(setCardErrors, setCardFocus)} />
          </CardElementWrapper>
          <div className='flex flex-row justify-end gap-4'>
            <CardElementWrapper label='Expiration' focus={expireFocus} error={expireErrors}>
              <CardExpiryElement {...getStripeElementProps(setExpireErrors, setExpireFocus)} />
            </CardElementWrapper>
            <CardElementWrapper label='CVC' focus={cvcFocus} error={cvcErrors}>
              <CardCvcElement {...getStripeElementProps(setCvcErrors, setCvcFocus)} />
            </CardElementWrapper>
          </div>
        </div>
        <Button variant='primary' type='submit' disabled={isProceeding} className='mt-4 w-[154px]'>
          Approve
        </Button>
      </form>
    </div>
  );
};

export const PaymentGateway: React.FC<PaymentProps> = ({ paymentId, onOpenChange }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  return (
    <Elements stripe={stripePromise}>
      <CardDetails paymentId={paymentId} onOpenChange={onOpenChange} />
    </Elements>
  );
};
