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
  name?: string;
  error?: string | null;
  defaultValue?: string;
  value?: string;
  type?: 'password' | 'text' | 'number';
  autoComplete?: 'off' | '';
  validator?: SimpleReactValidator;
  validations?: string;
  soon?: boolean;
};

export function MTextField({
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
  validator,
  validations,
}: MTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const simpleValidator = React.useRef(validator);
  const handleBlur = () => {
    simpleValidator?.current?.showMessageFor(error ? error : 'field');
  };
  React.useEffect(() => {
    // handleBlur?.();
  }, [value]);
  return (
    <Wrapper className="textfield-wrapper">
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
        onBlur={handleBlur}
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
    padding: 0px 0px 15px 0px;
    border-radius: 0px !important;
    .MuiTextField-root {
      width: 100%;
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
        padding: 0 15px !important;
        background: #4e4e4e !important;
        font-size: 12px !important;
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
          color: #cec2c2;
          opacity: 1;
        }
        @media (min-width: 1366px) and (max-width: 4000px) {
          font-size: 14px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 13px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 13px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 12px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 12px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 11px;
    }
      }
      .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill {
        box-shadow: inset 0 0 100px 100px #4e4e4e !important;
        font-size: 15px !important;
        border-radius: 0px !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
`;
const Errortext = styled.span`
  display: block;
  font-size: 12px;
  color: #e91344;
  padding-top: 4px !important;
  width: 280px;
`;
