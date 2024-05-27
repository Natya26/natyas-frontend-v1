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

export const LoginButton = ({
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
      font-size: 15px;
      font-weight: 600;
      font-family: 'Urbanist' !important;
      text-transform: capitalize !important;
      letter-spacing: 1.2px !important;
      background: #f4793b !important;
      color: #ffffff;
      width: 150px;
      border-radius: 8px !important;
      box-shadow: none !important;
      padding: 6px 8px !important;
      @media (min-width: 1366px) and (max-width: 4000px) {
        width: 170px;
        font-size: 16px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        width: 165px;
        font-size: 15px;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        width: 160px;
        font-size: 14px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        width: 140px;
        font-size: 13px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        width: 135px;
        font-size: 12px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        width: 120px;
        font-size: 11px;
      }
      &:hover {
        background: #f4793b !important;
      }
    }
  }
`;
