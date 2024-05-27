import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SimpleReactValidator from 'simple-react-validator';

export type MTextFieldProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // to handle onClick functions
  color?: 'primary' | 'secondary'; // two styling options (you can create as many as you want)
  border?: 'primary' | 'secondary';
  disabled?: boolean; // make the button disabled or not
  label?: String;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string | null;
  defaultValue?: string;
  value?: string;
  type?: 'password' | 'text' | 'number';
  autoComplete?: 'off' | '';
  validator?: SimpleReactValidator;
  validations?: string;
};



export function NumberField({
  onChange,
  color,
  border,
  label,
  placeholder,
  name,
  type,
  disabled,
  defaultValue,
  value,
  error,
  autoComplete,
  className,
  validator,
  validations
}: MTextFieldProps) {
  const simpleValidator = React.useRef(validator);
  const handleBlur = () => {
    simpleValidator?.current?.showMessageFor(error ? error : 'field');
  };
  return (
    <Wrapper className={`textfield-wrapper ${' ' + className}`}>
      <TextField
        autoComplete={autoComplete}
        label={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        type={'number'}
        disabled={disabled}
        onChange={onChange}
        inputProps={{
          autoComplete: 'new-password',
          form: {
            autoComplete: 'off',
          },
        }}
      />
       <Errortext className="error-text">
        {simpleValidator?.current?.message(
          error ? error : 'field',
          value,
          validations ?? '',
        )}
      </Errortext>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  &.textfield-wrapper {
    padding: 5px 0px;
    border-radius: 0px !important;
    width: 100%;
    .MuiTextField-root {
      width: 100%;
      .MuiFormLabel-root {
        top: -4px !important;
        color: #000000 !important;
        &.Mui-focused {
          color: #000000 !important;
        }
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .MuiInputBase-root {
        height: 100%;
        max-height: 48px !important;
        border-radius: 10px !important;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
        font-size: 12px !important;
        padding: 0 5px !important;
        background: #4e4e4e !important;
        .MuiOutlinedInput-notchedOutline {
          border: none !important;
          box-shadow: none !important;
        }
        &.Mui-disabled {
          cursor: pointer !important;
          .MuiInputBase-input {
            &.Mui-disabled {
              -webkit-text-fill-color: #ffffff !important;
            }
          }
        }
        &:hover {
          .MuiOutlinedInput-notchedOutline {
            border: none !important;
            box-shadow: none !important;
          }
        }
      }
      .MuiInputBase-input {
        box-shadow: none !important;
        background: transparent !important;
        color: #ffffff !important;
        ::placeholder {
          /* Firefox */
          color: #ffffff;
          opacity: 1;
        }
        @media (min-width: 1366px) and (max-width: 4000px) {
          font-size: 13px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 12px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 12px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 11px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 11px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px;
    }
      }
      .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill {
        box-shadow: inset 0 0 100px 100px #ffffff !important;
        font-size: 15px !important;
      }
    }
  }
`;
const Errortext = styled.span`
  display: block;
  font-size: 15px;
  color: #e91344;
  letter-spacing: 0.5px;
  padding-top: 8px !important;
`;
