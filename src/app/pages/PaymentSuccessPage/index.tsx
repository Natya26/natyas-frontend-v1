import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import useApi from 'services/mavapi/useApi';
import { NotificationApiService } from 'services/openapi/services/NotificationApisServices';
import SuccessIcon from './assets/img/icons/icon1.png';
import {
  PaySuccessPrimarylabel,
  PaySuccessSecondarylabel,
  StyledLabel,
} from 'app/components/MLabel';
import { PaymentApiService } from 'services/openapi/services/PaymentApiService';
import { useManageUserSlice } from '../Settings/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPaymentIntendData,
  selectPaymentUpdateRequestPayload,
  selectPayment_id,
} from '../Settings/slice/selectors';

type Props = {
  name?: string;
  summary?: string;
  id?: number;
};

export const PaymentSuccessPage = ({ name, summary, id }: Props) => {
  //URL param
  const { pId: userPaymentId } = useParams();
  //Decoded Paymnet id
  const DecodedPId = userPaymentId ? parseInt(atob(userPaymentId!)) : 0;
  const navigate = useNavigate();
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { getNotificationList } = NotificationApiService;
  const { updatePaymentSuccess } = PaymentApiService;
  const { actions } = useManageUserSlice();
  const dispatch = useDispatch();
  //Selectors
  const PaymentId = useSelector(selectPayment_id);
  const PaymentIntendData = useSelector(selectPaymentIntendData);
  const PaymentUpdateRequestPayload = useSelector(
    selectPaymentUpdateRequestPayload,
  );

  //updatePaymentSuccess
  const handleUpdatePaymentSuccess = () => {
    debugger;
    handleRequest(
      updatePaymentSuccess(DecodedPId!, PaymentUpdateRequestPayload!),
    )
      .then(res => {
        if (res?.data?.active) {
          // navigate(RoutePath.homepage.path);
          // Changed for fusion
          navigate(RoutePath.fusionhomepage.path);
          console.log(
            res,
            'Payment success res.........................................................',
          );
        }
      })
      .catch(err => console.log(err, 'Payment success  err'));
  };

  useEffect(() => {
    // setTimeout(() => {
    //   navigate(RoutePath.homepage.path);
    // }, 4000);
    handleUpdatePaymentSuccess();
  });

  return (
    <>
      <MainWrapper className="MainWrapper">
        <SubWrapper className="SubWrapper">
          <BodyWrapper className="BodyWrapper">
            <ImageWrapper>
              <StyledImage src={SuccessIcon} alt="Succes Icon" />
            </ImageWrapper>
            <ContentWrapper className="ContentWrapper">
              <TextWrapper className="TextWrapper">
                <PaySuccessPrimarylabel>Conratulations!</PaySuccessPrimarylabel>
                <PaySuccessSecondarylabel>
                  Your account is ready to use. You will be directed to the Home
                  page in a few seconds.
                </PaySuccessSecondarylabel>
              </TextWrapper>
            </ContentWrapper>
          </BodyWrapper>
        </SubWrapper>
      </MainWrapper>
    </>
  );
};
const MainWrapper = styled.div`
  font-family: Urbanist !important;
  background: #111010 !important;
  color: #ffffff;
  width: 100%;
  min-height: 100vh;
  padding: 64px 50px 40px 50px;
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 30px 20px;
  }
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 0 0;
  margin: 0 auto;
  flex-direction: column;
  max-width: 315px;
  text-align: center;
`;
const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 30px 0 0 0;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  max-width: 110px;
  height: auto;
  object-fit: cover;
  user-select: none;
  @media (min-width: 320px) and (max-width: 575px) {
    max-width: 50px;
  }
`;

const BodyWrapper = styled.div`
  background-color: rgb(24 22 22);
  padding: 80px 15px;
  width: 500px;
  height: 600px;
  max-width: 500px;
  max-height: 600px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgb(244 121 59 / 50%);
  border-radius: 16px;
  @media (min-width: 320px) and (max-width: 575px) {
    width: 300px;
    padding: 30px 15px;
    height: 450px !important;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  margin: 80px 0 0 0;
`;
