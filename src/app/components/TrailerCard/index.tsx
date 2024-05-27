import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ReactComponent as PlayButton } from './assets/img/watch_play_icon.svg';
// import WatchImg from './assets/img/wonderwoman.png';
import { useState } from 'react';

type CardProps = {
  children?: React.ReactNode; // make the component able to receive children elements
  planName?: string;
  planDetails?: any;
  expireDate?: any;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  id?: number;
  count?: string;
  name?: string;
  duration?: string;
  summary?: string;
  src?: string;
  className?: string;
  label?: string;
};

export const TrailerCard = ({
  children,
  onClick,
  label,
  isActive,
  planName,
  planDetails,
  expireDate,
  id,
  count,
  name,
  duration,
  summary,
  src,
  className,
}: CardProps) => {
  return (
    <div>
      <Wrapper onClick={onClick} className="card">
        <WatchImgWrapper src={src} onClick={onClick} />
        <ParaWrapper>{label}</ParaWrapper>
        <PlayButton className="play-button" />
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  font-family: 'Urbanist';
  width: 100%;
  height: auto;
  padding: 0px;
  margin: 20px 0px;
  color: #ffffff !important;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  cursor: pointer;
  position: relative;
  .play-button {
    position: absolute;
    z-index: 2;
    top: 70px;
    left: 139px;
    @media (min-width: 1366px) and (max-width: 4000px) {
      top: 70px;
      left: 139px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      top: 66px;
      left: 137px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      top: 60px;
      left: 125px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      top: 58px;
      left: 116px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      top: 50px;
      left: 108px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      width: 40px;
      height: 40px;
      top: 38px;
      left: 74px;
    }
  }
`;

const WatchImgWrapper = styled.img`
  width: 360px;
  height: 200px;
  object-fit: cover;
  z-index: 1;
  border-radius: 8px;
  @media (min-width: 1366px) and (max-width: 4000px) {
    width: 350px;
    height: 200px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    width: 330px;
    height: 190px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 310px;
    height: 180px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 290px;
    height: 170px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 270px;
    height: 160px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 195px;
    height: 120px;
  }
`;
const ParaWrapper = styled.p`
  display: flex;
  justify-content: center;
  color: rgb(255 255 255);
  font-family: 'Urbanist' !important;
  font-weight: 400;
  font-size: 14px !important;
`;
