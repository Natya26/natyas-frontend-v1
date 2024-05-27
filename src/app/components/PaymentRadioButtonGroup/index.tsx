import React from 'react';
import styled from 'styled-components';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import gpayICon from './assets/images/googlepay.png';
import phonepayICon from './assets/images/phonepay.png';
import visaCardICon from './assets/images/visa-card.png';

type Props = {
  data?: [];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | null | undefined;
};

const PaymentRadioButtonGroup = ({ data, onChange, value }: Props) => {
  const [radioValue, setVadioValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVadioValue((event.target as HTMLInputElement).value);
    onChange?.(event);
  };
  //Default data for Yes & No
  const Defaultdata = [
    { label: 'Buy with Google Pay', value: 'GPay' },
    { label: 'Buy with PhonePe', value: 'PhonePay' },
    { label: 'Debit Card/Credit Card', value: 'debit/credit' },
  ];
  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={radioValue}
        onChange={handleChange}
      >
        {Defaultdata?.map((item, ind) => {
          return (
            <ButtonWrapper className="ButtonWrapper">
              <FormControlLabel
                value={item?.value}
                control={<Radio />}
                label={item?.label}
              />
              <Image
                src={
                  item?.value === 'GPay'
                    ? gpayICon
                    : item?.value === 'PhonePay'
                    ? phonepayICon
                    : visaCardICon
                }
              />
            </ButtonWrapper>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
const ButtonWrapper = styled.div`
  text-align: left;
  background: #201e1e;
  margin: 5px 0;
  border-radius: 10px;
  padding: 0 20px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input[type='radio']:checked {
    accent-color: red;
  }
  .MuiFormControlLabel-root {
    svg[data-testid='RadioButtonUncheckedIcon'] {
      fill: #ed6924 !important;
      width: 18px !important;
    }
    svg[data-testid='RadioButtonCheckedIcon'] {
      width: 18px !important;
      color: #ed6924 !important;
    }
  }
`;
const Image = styled.img`
  max-width: 40px;
  object-fit: cover;
`;
export default PaymentRadioButtonGroup;
