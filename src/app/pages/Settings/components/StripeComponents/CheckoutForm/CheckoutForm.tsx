import React, { useState } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { RoutePath } from '../../../../../RoutePath';
import { Stripe } from '@stripe/stripe-js';
import ProfileSubscriptionCard from 'app/components/ProfileSubscriptionCard';
import { useSelector } from 'react-redux';
import {
  selectChoosedPlan,
  selectPaymentIntendData,
} from 'app/pages/Settings/slice/selectors';

type Props = {
  stripeInstanceState: Stripe;
  showStripes: boolean;
  setShowStripes: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckoutForm = ({
  stripeInstanceState,
  showStripes,
  setShowStripes,
}: Props) => {
  //Selectors
  const ChoosedPlan = useSelector(selectChoosedPlan);
  const PaymentIntendData = useSelector(selectPaymentIntendData);
  // const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<null | string>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  //Encoded Payment id
  const EncodedPId = PaymentIntendData!?.paymentId!
    ? btoa(PaymentIntendData!?.paymentId!.toString())
    : '';
  //Redirect URL on Confirm
  const SuccesRedirectUrl =
    window.location.origin +
    RoutePath.paymentSuccess.path.replace(':pId', EncodedPId);

  // navigate(RoutePath.playvideo.path.replace(':videoId', e));
  console.log(SuccesRedirectUrl, 'SuccesRedirectUrl');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripeInstanceState || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripeInstanceState.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page http://localhost:3032/home
        return_url: SuccesRedirectUrl,
        // return_url: `${
        //   window.location.origin +
        //   RoutePath.paymentSuccess.path.replace(':pId', e)
        // }`,
      },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error?.message!);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
        display: 'block',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <>
      {stripeInstanceState && (
        <CheckoutFormWrapper className="CheckoutFormWrapper">
          <StyledHeader className="StyledHeader">
            Your Plan Details
          </StyledHeader>
          <ProfileSubscriptionCard
            planName={ChoosedPlan?.name}
            planDetails={ChoosedPlan?.perks}
            newPlan={true}
            price={ChoosedPlan?.cost}
          />
          <StyledHeader className="StyledHeader detail">
            Enter Card Details
          </StyledHeader>
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <ButtonWrapper className="ButtonWrapper">
              <StyledButton
                onClick={() => setShowStripes(!showStripes)}
                className="cancel"
                id="cancel"
              >
                <span id="button-text">Cancel</span>
              </StyledButton>
              <StyledButton id="submit">
                <span id="button-text">
                  {isProcessing ? 'Processing ... ' : 'Pay now'}
                </span>
              </StyledButton>
            </ButtonWrapper>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        </CheckoutFormWrapper>
      )}
    </>
  );
};
const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  background: transparent !important;
  margin: 20px 2px;
`;
const StyledHeader = styled.h3`
  text-align: start;
  margin: 0 0 !important;
  font-family: 'Urbanist';
  letter-spacing: 0.3px;
  font-weight: 500;
  &.detail {
    margin: 20px 0px !important;
  }
`;
const CheckoutFormWrapper = styled.div`
  width: 100%;
  text-align: center;
  background: transparent !important;
  margin: 20px 2px;
  padding: 20px 50px;
  #payment-element {
    iframe {
      div {
        filter: invert(1) !important;
      }
    }
  }
  .StripeElement {
    label,
    .Label.p-FieldLabel {
      color: #ffffff !important;
    }
  }
`;
const StyledButton = styled.button`
  background-color: rgb(237, 113, 51) !important;
  padding: 15px 10px !important;
  width: 100%;
  max-width: 200px;
  min-width: 100px;
  color: rgb(255, 255, 255) !important;
  margin: 6px !important;
  border-radius: 8px !important;
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 6px rgb(237, 113, 51) !important;
  }
  &.cancel {
    background: #757575 !important;
    color: white !important;
    max-width: 150px !important;
    box-shadow: none !important;
    &:hover {
      background: #000 !important;
    }
    @media (min-width: 768px) and (max-width: 991px) {
    }
    @media (min-width: 576px) and (max-width: 767px) {
      max-width: 100px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      min-width: 80px !important;
      max-width: 80px !important;
    }
  }
  @media (min-width: 1366px) and (max-width: 4000px) {
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
  }
  @media (min-width: 992px) and (max-width: 1199px) {
  }
  @media (min-width: 768px) and (max-width: 991px) {
    /* max-width: 150px; */
  }
  @media (min-width: 576px) and (max-width: 767px) {
    max-width: 150px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    /* max-width: 130px !important; */
    min-width: 100px !important;
    max-width: 100px !important;
  }
`;
export default CheckoutForm;
