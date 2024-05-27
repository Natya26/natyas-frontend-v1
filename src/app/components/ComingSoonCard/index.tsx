import React from 'react';
import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
import CardImg from './assets/img/bg/1.png';

type CardProps = {
  name?: string | null;
  poster?: string | null;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const ComingSoonCard = ({ poster, onClick }: CardProps) => {
  return (
    <CardWrapper className="home-comingsoon-card" onClick={onClick}>
      <Card sx={{ maxWidth: '100%' }}>
        <CardMedia
          component="img"
          image={poster ? poster : CardImg}
          alt="episode-img"
        />
      </Card>
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  /* width: fit-content !important; */
  display: block;
  margin: 0 5px;
  cursor: pointer;
  .MuiPaper-root.MuiPaper-elevation {
    background: transparent !important;
    box-shadow: none !important;
    width: fit-content !important;
    img.MuiCardMedia-root {
      background-position: center;
      width: 1008px;
      height: 542px;
      object-fit: cover;
      border-radius: 10px !important;
      cursor: pointer;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      // X-Small devices (portrait phones to landscape phones)
      @media (min-width: 320px) and (max-width: 766px) {
        width: 346px;
        height: 186px;
      }

      // Small devices (landscape phones to  tablets)
      @media (min-width: 767.98px) and (max-width: 990px) {
        width: 605px;
        height: 325px;
      }

      // Medium devices (tablets to desktops)
      @media (min-width: 991.98px) and (max-width: 1198px) {
        width: 807px;
        height: 433px;
      }

      // Large devices (desktops to  large desktops)
      @media (min-width: 1199.98px) and (max-width: 1365px) {
        width: 1008px;
        height: 542px;
      }

      // X-Large devices (large desktops, less than 1400px)
      @media (min-width: 1366px) and (max-width: 1439px) {
        width: 1008px;
        height: 542px;
      }

      @media (min-width: 1440px) and (max-width: 1600px) {
        width: 1008px;
        height: 542px;
      }

      @media (min-width: 1600px) {
        width: 1117px;
        height: 600px;
        max-width: inherit;
        max-height: inherit;
      }
    }
  }
`;
export default ComingSoonCard;
