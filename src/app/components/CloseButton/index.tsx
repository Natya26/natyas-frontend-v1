import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import close from './assets/img/close.png';

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  children?: React.ReactNode; // make the component able to receive children elements
  buttonType?: 'primary' | 'secondary' | 'icon'; // two styling options (you can create as many as you want)
  disabled?: boolean; // make the button disabled or not
  type?: 'submit' | 'button';
  variant?: 'contained' | 'outlined' | 'text';
  className?: string;
  color?: 'success' | 'warning';
};

export const CloseButton = ({
  onClick,
  children,
  variant,
  color,
  type,
  className,
}: ButtonProps) => {
  return (
    <Wrapper className={`${className} button-wrapper`}>
      <Button onClick={onClick} variant={variant} color={color} type={type}>
        <img src={close}   />
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 2px 2px;
`;
