import React from 'react';
import styled from 'styled-components';
import PaymentRadioButtonGroup from 'app/components/PaymentRadioButtonGroup';

type Props = {
  showDetailsPopUp: boolean;
  setShowDetailsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardSetupForm = ({ showDetailsPopUp, setShowDetailsPopUp }: Props) => {
  const handlePaymentOptionChange = e => {
    if (e) {
      setShowDetailsPopUp?.(true);
      console.log(e, 'radio event');
    }
  };
  return (
    <Wrapper>
      <TitleWrapper className="TitleWrapper">
        Select the payment method you want to use.{' '}
      </TitleWrapper>
      <PaymentRadioButtonGroup onChange={handlePaymentOptionChange} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
`;
const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 16px 0;
`;
export default CardSetupForm;
