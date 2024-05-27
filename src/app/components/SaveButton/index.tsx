import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  children?: React.ReactNode; // make the component able to receive children elements
  buttonType?: 'primary' | 'secondary' | 'icon'; // two styling options (you can create as many as you want)
  disabled?: boolean; // make the button disabled or not
  type?: 'submit' | 'button';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'success' | 'warning';
};

export const SaveButton = ({
  onClick,
  children,
  variant,
  color,
  type,
}: ButtonProps) => {
  return (
    <Wrapper className="button-wrapper">
      <Button onClick={onClick} variant={variant} color={color} type={type}>
        {children}
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 2px 2px;
  &.button-wrapper {
    .MuiButtonBase-root {
      font-size: 12px;
      font-weight: 400;
      text-transform: capitalize !important;
      letter-spacing: 1px !important;
      background: #f4793b !important;
      color: #ffffff;
      max-height: 32px;
      min-width: 100px !important;
      max-width: 150px !important;
      border: 1px solid #f4793b;
      border-radius: 8px !important;
      box-shadow: none !important;
      padding: 6px 0px !important;
      &:hover {
        background: #ff955e !important;
      }
    }
  }
`;
