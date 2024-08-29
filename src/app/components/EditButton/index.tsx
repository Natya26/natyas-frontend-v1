import React from 'react';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import icon from './assets/img/1.svg';

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  children?: React.ReactNode; // make the component able to receive children elements
  disabled?: boolean; // make the button disabled or not
  icon?: string;
  className?: string;
  variant?: 'outlined' | 'contained';
  type?: 'button' | 'submit';
  color?: 'primary' | 'secondary';
};
const EditButton = ({
  onClick,
  disabled,
  children,
  type,
  variant,
  className,
}: ButtonProps) => {
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
  margin: 2px 2px !important;
  padding: 10px 10px !important;
  text-align: center;
  text-transform: none !important;
  min-width: 50px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #201e1e !important;
  color: #e0be00 !important;
  border-radius: 10px !important;
  font-family: 'Urbanist' !important;
  .text-span {
    padding-left: 15px;
    @media (min-width: 320px) and (max-width: 575px) {
      padding-left: 0px;
      display:none;
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
export default EditButton;
