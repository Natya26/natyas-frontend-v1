import React from 'react';
import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
// import CardImg from './assets/img/bg/1.png';
import CardImg from './assets/img/bg/HORIZON.png';

type CardProps = {
  name?: string | null;
  duration?: number | null;
  createdAt?: string | null;
  poster?: string | null;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const DrawerEpisodeCard = ({ poster, onClick }: CardProps) => {
  return (
    <CardWrapper onClick={onClick} className="episode-card">
      <Card sx={{ maxWidth: '100%' }}>
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
  width: 100%;
  // min-width: 150px;
  margin: 0 5px;
  cursor: pointer !important;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 86%;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 70%;
  }
  .MuiPaper-root.MuiPaper-elevation {
    border-radius: 10px !important;
    background: transparent !important;
    cursor: pointer;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 340px;
    height: 190px;
    img {
      @media (min-width: 1366px) and (max-width: 4000px) {
        width: 330px !important;
        height: 190px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        width: 310px !important;
        height: 190px;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        width: 280px !important;
        height: 190px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        width: 260px !important;
        height: 190px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        width: 260px !important;
        height: 190px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        width: 260px !important;
        height: 190px;
        border-radius: 10px !important;
      }
    }
  }
`;
export default DrawerEpisodeCard;
