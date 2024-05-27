import React from 'react';
import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
import CardImg from './assets/img/bg/logo.svg';

type CardProps = {
  name?: string | null;
  duration?: number | null;
  createdAt?: string | null;
  className?: string;
  poster?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const ImageCard = ({ poster, className, onClick, disabled }: CardProps) => {
  return (
    <CardWrapper
      className={`${className} home-series-card`}
      onClick={onClick}
      style={
        disabled
          ? {
              cursor: 'pointer',
              pointerEvents: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
            }
          : {}
      }
    >
      <Card>
        <CardMedia
          component="img"
          height="150"
          image={poster ? poster : CardImg}
          alt="episode-img"
        />
      </Card>
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  margin: 10 5px;
  cursor: pointer;
  .MuiPaper-root.MuiPaper-elevation {
    background: transparent !important;
    box-shadow: none !important;
    width: fit-content !important;
    img.MuiCardMedia-root {
      background-position: center;
      width: 265px;
      height: 364px;
      border-radius: 10px !important;
      object-fit: fill;
      object-position: 50% 50%;
      background-color: #000000;
      cursor: pointer;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      // X-Small devices (portrait phones to landscape phones)
      @media (min-width: 320px) and (max-width: 766px) {
        width: 125px;
        height: 175px;
        object-fit: contain;
      }

      // Small devices (landscape phones to  tablets)
      @media (min-width: 767.98px) and (max-width: 990px) {
        width: 200px;
        height: 275px;
      }

      // Medium devices (tablets to desktops)
      @media (min-width: 991.98px) and (max-width: 1198px) {
        width: 265px;
        height: 364px;
      }

      // Large devices (desktops to  large desktops)
      @media (min-width: 1199.98px) and (max-width: 1365px) {
        width: 265px;
        height: 364px;
      }

      // X-Large devices (large desktops, less than 1400px)
      @media (min-width: 1366px) and (max-width: 1439px) {
        width: 265px;
        height: 364px;
      }

      @media (min-width: 1440px) and (max-width: 1600px) {
        width: 265px;
        height: 364px;
      }

      @media (min-width: 1600px) {
        width: 265px;
        height: 364px;
      }
    }
  }
`;
export default ImageCard;
