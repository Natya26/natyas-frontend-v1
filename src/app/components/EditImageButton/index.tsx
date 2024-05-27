import React from 'react';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import icon from './assets/img/icon/1.svg';
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

const EditImageButton = ({
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
    </StyledButton>
  );
};
const StyledButton = styled(Button)`
  margin: 2px 2px !important;
  padding: 5px !important;
  text-align: center;
  text-transform: none !important;
  min-width: 30px !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f4793b !important;
  color: #ffffff !important;
  border-radius: 10px !important;
  font-family: 'Urbanist' !important;
  &.MuiButtonBase-root.MuiButton-root.Mui-disabled {
    color: #ffffff !important;
    box-shadow: none !important;
    background-color: #9ab2df !important;
  }
`;
const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

export default EditImageButton;
