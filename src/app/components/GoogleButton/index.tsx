import React from 'react';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import icon from './assets/img/1.svg';

export type LongButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  children?: React.ReactNode; // make the component able to receive children elements
  disabled?: boolean; // make the button disabled or not
  icon?: string;
  className?: string;
  variant?: 'outlined' | 'contained';
  type?: 'button' | 'submit';
  color?: 'primary' | 'secondary';
};

const GoogleButton = ({
  onClick,
  disabled,
  children,
  type,
  variant,
  className,
}: LongButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      type={type}
      className={`StyledButton + ${' ' + className}`}
    >
      <Icon src={icon} />
      <span className="text-span">{children}</span>
    </StyledButton>
  );
};
const StyledButton = styled(Button)`
  margin: 5px 2px !important;
  padding: 10px 0px !important;
  text-align: center;
  text-transform: none !important;
  min-width: 250px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  color: #ffffff !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 7px !important;
  font-family: 'Urbanist' !important;
  @media (min-width: 1366px) and (max-width: 4000px) {
    min-width: 200px !important;
    height:35px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    min-width: 200px !important;
    height:35px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    min-width: 200px !important;
    height:35px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    min-width: 220px !important;
    height:35px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    min-width: 190px !important;
    height:30px;

  }
  @media (min-width: 320px) and (max-width: 575px) {
    min-width: 180px !important;
    height:30px;
    
  }
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important; */
  .text-span {
    padding-left: 15px;
    font-size:14px;
    @media (min-width: 1366px) and (max-width: 4000px) {
      font-size:16px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size:15px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size:14px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size:13px;
      padding-left: 10px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size:13px;
      padding-left: 8px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size:11px;
      padding-left: 5px;
    }
  }

  &.MuiButtonBase-root.MuiButton-root.Mui-disabled {
    color: #ffffff !important;
    box-shadow: none !important;
    background-color: #9ab2df !important;
  }
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
export default GoogleButton;
