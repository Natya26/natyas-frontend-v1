import React from 'react';
import styled from 'styled-components';
import playbutton from './assets/images/play_icon.png';

export type ButtonProps = {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  buttonType?: 'primary' | 'secondary' | 'icon'; // two styling options (you can create as many as you want)
  type?: 'submit' | 'button';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'success' | 'warning';
  className?: string;
};

export const PlayButton = ({
  onClick,
  children,
  variant,
  color,
  type,
  className,
}: ButtonProps) => {
  return (
    <Wrapper onClick={onClick}  className="button-wrapper">
      <PlayBtnWrapper className={className}>
        <ImgWrapper src={playbutton} alt="play_button" />
      </PlayBtnWrapper>
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
      background: transparent !important;
      color: #f4793b;
      width: 100%;
      max-height: 32px;
      min-width: 80px !important;
      max-width: 99px !important;
      border: 1px solid #f4793b;
      border-radius: 10px !important;
      box-shadow: none !important;
      padding: 6px 0px !important;
      &:hover {
        background: #202020 !important;
      }
    }
  }
`;

const PlayBtnWrapper = styled.div``;

const ImgWrapper = styled.img`
  width: 100px;
  height: autopx;
`;
