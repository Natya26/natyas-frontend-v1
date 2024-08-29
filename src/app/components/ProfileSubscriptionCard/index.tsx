import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ActiveIcon } from './assets/img/icons/1.svg';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

type CardProps = {
  children?: React.ReactNode; // make the component able to receive children elements
  planName?: string;
  validFrom?: string;
  validTill?: string;
  planDetails?: any;
  price?: number;
  expireDate?: any;
  isActive?: boolean;
  newPlan?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const ProfileSubscriptionCard = ({
  children,
  onClick,
  isActive,
  planName,
  planDetails,
  expireDate,
  validFrom,
  validTill,
  newPlan,
  price,
}: CardProps) => {
  // const PlanOptions = planDetails?.join(' ');
  const PlanOptions = planDetails;

  return (
    <Wrapper
      className={`subcriptioncard-wrapper ${
        Boolean(isActive) || Boolean(newPlan) ? 'isActive' : 'inActive'
      }`}
      onClick={onClick}
    >
      {Boolean(isActive) || Boolean(newPlan) ? (
        <IconWrapper>
          <ActiveIcon />
        </IconWrapper>
      ) : null}
      <NameBlockWrapper
        className={`name-block-wrapper ${
          Boolean(isActive) || Boolean(newPlan) ? 'isActive' : 'inActive'
        }`}
      >
        {Boolean(isActive) ? (
          <Typography variant="subtitle1">Current Plan :</Typography>
        ) : newPlan ? (
          <Typography variant="subtitle1">Your Plan</Typography>
        ) : (
          ''
        )}
        <Typography component="h5">{planName}</Typography>
        <PriceWrapper className="PriceWrapper">
          <Typography component="p">
            <CurrencyRupeeIcon />
            {price}
          </Typography>
        </PriceWrapper>
      </NameBlockWrapper>
      <ContentBlockWrapper>
        <DetailsBlock>
          <Typography variant="body2">{PlanOptions}</Typography>
        </DetailsBlock>
        {Boolean(isActive)  ? (
          <ExpireBlock>
            {/* <Typography variant="body2">Expires on {expireDate}</Typography> */}
            <Typography variant="body2">
              Valid Through{' '}
              <ValidityWrapper className="ValidityWrapper">
                {dateFormat(new Date(validFrom!), 'dd-mmm-yyyy')}{' '}
                <SubSpan>to</SubSpan>
                {dateFormat(new Date(validTill!), 'dd-mmm-yyyy')}
              </ValidityWrapper>
            </Typography>
          </ExpireBlock>
        ) : null}
      </ContentBlockWrapper>
    </Wrapper>
  );
};
const SubSpan = styled.span`
  margin: 0px 5px;
`;
const ValidityWrapper = styled.span`
  margin: 0 4px;
`;
const PriceWrapper = styled.span`
  width: 100%;
  svg {
    width: 15px !important;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 100px;
  padding: 0px;
  margin: 16px 0px;
  background: #201e1e !important;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #5a5a5a;
  position: relative;
  cursor: pointer;
  @media (min-width: 576px) and (max-width: 767px) {
    min-height: 75px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    min-height: 67px;
  }
  &.isActive {
    border: 1px solid #e0be00 !important;
  }
`;
const NameBlockWrapper = styled.div`
  width: 28%;
  height: 100%;
  min-height: inherit;
  max-width: 100%;
  border-radius: 8px;
  margin: 3px 3px;
  font-family: 'Urbanist' !important;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &.name-block-wrapper {
    background: #272323;
  }
  &.name-block-wrapper.isActive {
    background: #442a1d !important;
  }
  h5 {
    font-size: 14px !important;
    font-family: 'Urbanist' !important;
    font-weight: 600;
    letter-spacing: 1.1px;
    margin: 0 0 5px 0;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 11px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px !important;
    }
  }
  h6 {
    font-size: 14px !important;
    font-family: 'Urbanist' !important;
    font-weight: 400;
    letter-spacing: 1.1px;
    margin: 0 0 5px 0;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 11px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px !important;
    }
  }
`;
const DetailsBlock = styled.div`
  width: 100%;
  margin: 6px 0 6px 0;
  max-width: fit-content;
`;
const ExpireBlock = styled.div`
  width: 100%;
  border: 1px solid #e0be00;
  padding: 4px 8px;
  min-width: 100px;
  max-width: fit-content;
  border-radius: 5px;
  @media (min-width: 576px) and (max-width: 767px) {
    min-width: unset;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    min-width: unset;
  }
`;
const ContentBlockWrapper = styled.div`
  width: 70%;
  padding: 0 30px 0 15px;
  margin: 3px;
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 0 10px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 0 5px;
  }
  p {
    color: rgb(255 255 255);
    font-family: 'Urbanist' !important;
    font-weight: 400;
    font-size: 12px !important;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 10px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 8px !important;
    }
  }
`;
const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -20px;
  z-index: 1;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 30px;
    height: 30px;
    left: -16px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 25px;
    height: 25px;
    left: -12px;
  }
  svg {
    fill: #e0be00;
  }
`;
export default ProfileSubscriptionCard;
