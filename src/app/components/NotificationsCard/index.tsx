import React from 'react';
import styled from 'styled-components';

type CardProps = {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  id?: number;
  name?: string;
  summary?: string;
  src?: string;
  className?: string;
};

export const NotificationsCard = ({
  onClick,
  id,
  name,
  summary,
  src,
  className,
}: CardProps) => {
  return (
    <NotificationCardWrapper
      onClick={onClick}
      className="NotificationCardWrapper"
    >
      <Wrapper className={`watch-wrapper`}>
        {src ? (
          <LeftWrapper className={`name-block-wrapper `}>
            <WatchImgWrapper src={src} onClick={onClick} />
          </LeftWrapper>
        ) : (
          ''
        )}

        <RightWrapper>
          <h4>{name}</h4>
          <p className="summary">{summary}</p>
        </RightWrapper>
      </Wrapper>
    </NotificationCardWrapper>
  );
};
const NotificationCardWrapper = styled.div``;
const Wrapper = styled.div`
  font-family: 'Urbanist';
  width: 100%;
  height: auto;
  color: #ffffff;
  background: #201d1d !important;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
  padding: 15px 20px;
  gap: 20px;
  @media (min-width: 1366px) and (max-width: 4000px) {
    min-height: 95px;
  }

  @media (min-width: 1200px) and (max-width: 1365px) {
    min-height: 88px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    min-height: 83px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    min-height: 79px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 15px;
    min-height: 75px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 15px;
    min-height: 73px;
  }
`;
const LeftWrapper = styled.div`
  max-width: 30%;
  height: auto;
  color: #ffffff;
  border-radius: 5px;
  font-family: 'Urbanist' !important;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 8px;

  @media (min-width: 320px) and (max-width: 575px) {
    max-width: 100%;
  }
`;
const RightWrapper = styled.div`
  width: 70%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  @media (min-width: 320px) and (max-width: 575px) {
    max-width: 100% !important;
    padding: 0px;
  }

  h4 {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.5px;
    line-height: 1.6;
    margin: 0px;
    @media (min-width: 1366px) and (max-width: 4000px) {
      font-size: 18px !important;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 17px !important;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 16px !important;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 15px !important;
    }

    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 15px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 14px !important;
    }
  }

  p {
    color: rgb(255 255 255);
    font-family: 'Urbanist' !important;
    font-weight: 400;
    font-size: 13px !important;
    margin: 0px;
    padding: 6px 0px 0px 0px;
    letter-spacing: 0.5px;
    line-height: 1.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (min-width: 1366px) and (max-width: 4000px) {
      padding: 8px 0px 0px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      font-size: 15px !important;
      padding: 6px 0px 0px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 14px !important;
      padding: 5px 0px 0px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px !important;
      padding: 4px 0px 0px;
    }

    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 13px !important;
      padding: 2px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 13px !important;
      padding: 0px;
    }
  }
`;
const WatchImgWrapper = styled.img`
  width: 98px;
  max-width: 200px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  @media (min-width: 1366px) and (max-width: 4000px) {
    width: 98px;
    height: 60px;
  }

  @media (min-width: 1200px) and (max-width: 1365px) {
    width: 90px;
    height: 56px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 84px;
    height: 53px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 78px;
    height: 50px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 74px;
    height: 48px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 60px;
    height: 38px;
  }
`;
