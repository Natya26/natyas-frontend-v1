import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DrawerIcon } from './assets/img/icon/1.svg';

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const DrawerButton = ({ onClick }: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };
  return (
    <ButtonWrapper onClick={handleClick} className="drawer-button-wrapper">
      <DrawerIcon />
    </ButtonWrapper>
  );
};
const ButtonWrapper = styled.div`
  cursor: pointer;
  &.drawer-button-wrapper {
    width: fit-content;
    svg {
      width: 100%;
      min-width: 128px;
      max-width: 128px;
      height: 100%;
      @media (min-width: 768px) and (max-width: 991px) {
        min-width: 110px;
        max-width: 110px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        min-width: 100px;
        max-width: 100px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        min-width: 90px;
        max-width: 90px;
      }
    }
  }
`;
export default DrawerButton;
