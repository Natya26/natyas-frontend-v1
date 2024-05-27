import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PlayButton } from './assets/img/watch_play_icon.svg';
import sd from 'simple-duration-converter';

type CardProps = {
  children?: React.ReactNode; // make the component able to receive children elements
  planName?: string | null;
  planDetails?: any;
  expireDate?: any;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  id?: number | null;
  count?: string | null;
  name?: string | null;
  duration?: number | null;
  summary?: string | null;
  src?: string | null;
  className?: string | null;
};

export const WatchCard = ({
  children,
  onClick,
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
      <Wrapper className={`watch-wrapper`} onClick={onClick}>
        <LeftWrapper className={`name-block-wrapper `}>
          <WatchImgWrapper src={src ?? ''} onClick={onClick} />
          <PlayButton className="play-button" />
        </LeftWrapper>
        <RightWrapper>
          <TopWrapper>
            <SubWrapper>
              <p>{count}</p>
              <p>{name}</p>
            </SubWrapper>
            <p> {sd.stringify(duration ?? 0)}</p>
          </TopWrapper>
          <p className="summary">{summary}</p>
        </RightWrapper>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  font-family: 'Urbanist';
  width: 100%;
  height: auto;
  padding: 0px 20px 20px 0px;
  margin: 30px 0px;
  color: #ffffff !important;
  background: #2a2727 !important;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 0px;
  }
  p {
    color: #ffffff;
    font-weight: 400;
    font-family: Urbanist !important;
    font-size: 14px !important;
    letter-spacing: 0.5px;
    line-height: 1.6;
  }
`;
const LeftWrapper = styled.div`
  width: 330px;
  height: 190px;
  color: #ffffff;
  border-radius: 5px;
  background: #2a2727 !important;
  margin: 0px 40px 0px 0px;
  font-family: 'Urbanist' !important;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-direction: column;
  position: relative;
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
  &.name-block-wrapper {
    background: #272323;
  }
  .play-button {
    position: absolute;
    z-index: 2;
    cursor: pointer;
    @media (min-width: 320px) and (max-width: 575px) {
      width: 40px;
      height: 40px;
    }
  }
`;
const RightWrapper = styled.div`
  width: 70%;
  padding: 0 0px 0 10px;

  p {
    color: rgb(255 255 255);
    font-family: 'Urbanist' !important;
    font-weight: 400;
    font-size: 14px;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 12px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px !important;
    }
  }
`;
const WatchImgWrapper = styled.img`
  width: 350px;
  height: 200px;
  object-fit: cover;
  z-index: 1;
  border-radius: 8px;
  cursor: pointer;
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
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SubWrapper = styled.div`
  display: flex;
`;
