import React from 'react';
import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
import CardImg from './assets/img/logo/logo.svg';

type CardProps = {
  name?: string | null;
  poster?: string | null;
  onDelete?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const RecommendedCard = ({ poster, onClick }: CardProps) => {
  return (
    <CardWrapper onClick={onClick} className="home-recommended-card">
      <Card>
        <CardMedia
          component="img"
          image={poster ? poster : CardImg}
          alt="recommended-card-img"
        />
      </Card>
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  cursor: pointer;
  display: block;
  width: 620px;
  height: 390px;
  // X-Small devices (portrait phones to landscape phones)
  @media (min-width: 320px) and (max-width: 575px) {
    width: 200px;
    height: 130px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 263px;
    height: 180px;
  }

  // Small devices (landscape phones to  tablets)
  @media (min-width: 767.98px) and (max-width: 990px) {
    width: 347px;
    height: 230px;
  }

  // Medium devices (tablets to desktops)
  @media (min-width: 991.98px) and (max-width: 1198px) {
    width: 450px;
    height: 280px;
  }

  // Large devices (desktops to  large desktops)
  @media (min-width: 1199.98px) and (max-width: 1365px) {
    width: 543px;
    height: 346px;
  }

  // X-Large devices (large desktops, less than 1400px)
  @media (min-width: 1366px) and (max-width: 1439px) {
    width: 629px;
    height: 410px;
  }

  @media (min-width: 1440px) and (max-width: 1600px) {
    width: 665px;
    height: 451px;
  }

  @media (min-width: 1600px) {
    width: 880px;
    height: 560px;
    max-width: inherit;
    max-height: inherit;
  }
  .MuiPaper-root.MuiPaper-elevation {
    background: transparent !important;
    box-shadow: none !important;
    width: 100% !important;
    height: 100% !important;
    cursor: pointer;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    img.MuiCardMedia-root {
      background-position: center;
      width: 100%;
      border-radius: 10px !important;
      object-fit: contain;
      height: 100% !important;
      background: black;
    }
  }
`;
export default RecommendedCard;
