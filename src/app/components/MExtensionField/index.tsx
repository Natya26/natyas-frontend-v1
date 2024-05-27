import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
};

export function MExtensionField({
  onChange,
  color,
  border,
  label,
  placeholder,
  className,
  name,
  type,
  disabled,
  defaultValue,
  value,
  error,
  autoComplete,
}: MTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Wrapper className={`${className} textfield-wrapper`}>
      <TextField
        autoComplete={autoComplete}
        label={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        disabled={disabled}
        onChange={onChange}
        inputProps={{
          autoComplete: 'new-password',
          form: {
            autoComplete: 'off',
          },
        }}
        InputProps={
          type === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
      <Errortext className="error-text">{error && error}</Errortext>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  &.textfield-wrapper {
    /* padding: 5px 5px;
    border-radius: 0px !important; */
    .MuiTextField-root {
      width: 100%;
      max-height: 48px !important;
      max-width: 40px !important;
      .MuiFormLabel-root {
        top: -4px !important;
        color: #000000 !important;
        &.Mui-focused {
          color: #000000 !important;
        }
      }
      .MuiInputBase-root {
        height: 100%;
        max-height: 48px !important;
        border-radius: 10px !important;
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        padding: 0 5px 0px 10px !important;
        background: #4e4e4e !important;
        .MuiOutlinedInput-notchedOutline {
          border: none !important;
          box-shadow: none !important;
        }
        &.Mui-disabled {
          cursor: pointer !important;
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
        min-width: 27px;
        ::placeholder {
          /* Firefox */
          color: #cec2c2;
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
