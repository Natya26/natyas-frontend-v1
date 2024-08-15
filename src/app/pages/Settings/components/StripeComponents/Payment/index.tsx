import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { PaymentApiService } from 'services/openapi/services/PaymentApiService';
import useApi from 'services/mavapi/useApi';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentIntendData } from 'services/openapi/models/PaymentIntendResponse';

type Props = {
  publishableKey?: string;
  paymentIntendData: PaymentIntendData;
  showStripes: boolean;
  setShowStripes: React.Dispatch<React.SetStateAction<boolean>>;
};
// const stripePromise = loadStripe(
//   'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
// );
// const options: StripeElementsOptions = {
//   mode: 'payment',
//   currency: 'usd',
//   amount: 1099,
// };
const Payment = ({
  // publishableKey,
  paymentIntendData,
  showStripes,
  setShowStripes,
}: Props) => {
  const { getPaymentIntend } = PaymentApiService;
  const [stripeInstanceState, setStripeInstanceState] = useState<Stripe | null>(
    null,
  );

  const { error: apiError, isLoading, handleRequest } = useApi();
  //   const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntendState, setPaymentIntendState] = useState<string>('');
  //Get User Subscription
  const handleGetPaymentIntend = payload => {
    handleRequest(getPaymentIntend(payload))
      .then(res => {
        if (res?.data) {
          console.log(res, 'getPaymentIntend res');
          setPaymentIntendState(res?.data?.paymentIntent);
        }
      })
      .catch(err => console.log(err, 'getPaymentIntend err'));
  };

  const appearance = {
    theme: 'night',
  };
  // Function to asynchronously load Stripe
  const loadStripeAsync = async () => {
    const stripeInstance = await loadStripe(paymentIntendData?.publishableKey!);
    setStripeInstanceState(stripeInstance);
  };

  useEffect(() => {
    loadStripeAsync();
  }, [paymentIntendData]);
  const appearance1 = {
    theme: 'night',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    },
  };
  const appearance2 = {
    // If you are planning to extensively customize rules, use the "none"
    // theme. This theme provides a minimal number of rules by default to avoid
    // interfering with your custom rule definitions.
    theme: 'night',
    mode: undefined,
    rules: {
      '.LAbel': {
        color: '#ffffff',
        border: '1px solid #E0E6EB',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
      },
      '.Tab': {
        border: '1px solid #E0E6EB',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
      },

      '.Tab:hover': {
        color: 'var(--colorText)',
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
      },

      '.Input--invalid': {
        boxShadow:
          '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
      },

      // See all supported class names and selector syntax below
    },
  };
  const OPTIONS = {
    clientSecret: paymentIntendData!?.paymentIntent,

    ...appearance2,
  };
  return (
    <>
      {stripeInstanceState ? (
        <PaymentFormWrapper className="PaymentFormWrapper">
          {stripeInstanceState && (
            <Elements stripe={stripeInstanceState} options={OPTIONS}>
              <CheckoutForm
                stripeInstanceState={stripeInstanceState}
                showStripes={showStripes}
                setShowStripes={setShowStripes}
              />
            </Elements>
          )}
        </PaymentFormWrapper>
      ) : (
        <></>
      )}
    </>
  );
};
const PaymentFormWrapper = styled.div`
  width: 100%;
  text-align: center;
  background: transparent !important;
  margin: 20px 2px;
`;
export default Payment;
