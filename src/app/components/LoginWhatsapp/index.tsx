import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useEffect } from 'react';
import { LoginButton } from '../LoginButton';
import useApi from 'services/mavapi/useApi';
import { AuthenticationApIsService } from 'services/openapi';
import { useSelector } from 'react-redux';
import {
  selectLoginUserPayload,
  selectResendOtpPayload,
} from 'app/layouts/OnboardLayout/slice/selectors';
import useToast from 'hooks/Toast';
import { LoginWhatsappButton } from '../LoginWhatsappButton';

export const LoginWhatsapp = ({ onBack }) => {
  const { setOffToast } = useToast();

  const { error: apiError, handleRequest } = useApi();
  const { authOtpResend } = AuthenticationApIsService;
  const loginPayLoad = useSelector(selectLoginUserPayload);
  const resendOtppayload = useSelector(selectResendOtpPayload);

  const [count, setCount] = useState<number>(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count !== undefined && count > 0) {
        setCount(count - 1);
      }

      if (count === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  const handleResendOtp = () => {
    handleRequest(authOtpResend(resendOtppayload!)).then(res => {
      if (res.data === 'SUCCESS') {
        setCount(59);
        setOffToast('success', 'OTP sent successfully');
      } else {
        setOffToast('error', 'Invalid OTP entered');
      }
    });
  };
  const handleWhatsappLogin = () => {
    const whatsappURL = `https://api.whatsapp.com/send?phone=919718134978&text&type=phone_number&app_absent=0`;
    window.location.href = whatsappURL; // Redirect the user to WhatsApp in the same tab
  };
  return (
    <OtpWrapper>
      <Box>
        <div>
          <p
            style={{
              fontFamily: 'Urbanist',
              fontWeight: '300',
              fontSize: '14px',
              marginBottom: '40px',
              color: '#FFFFFF',
            }}
          >
            Code link sent to Whatsapp
          </p>
          <Box component="form" noValidate autoComplete="off">
            <MainWrapper>
              <LoginWrapper>
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    flexDirection: 'column',
                  }}
                >
                  <LoginWhatsappButton
                    text="#Open Whatsapp"
                    onClick={handleWhatsappLogin}
                  />
                  <LoginButton onClick={onBack}> Go Back </LoginButton>
                </div>
              </LoginWrapper>
            </MainWrapper>
          </Box>
          {/* <p
            style={{
              fontFamily: 'Urbanist',
              fontWeight: '250',
              fontSize: '13px',
              marginBottom: '20px',
              color: '#FFFFFF',
            }}
          >
            Resend code in <span>{count}</span> seconds
          </p>

          {count != 0 ? (
            <LoginButton onClick={handleSubmit}>Verify</LoginButton>
          ) : (
            <LoginButton onClick={handleResendOtp}>Resend</LoginButton>
          )} */}
        </div>
      </Box>
    </OtpWrapper>
  );
};

const OtpWrapper = styled.div`
  justify-content: center;
  display: flex;
  text-align: center;
`;

const MainWrapper = styled.div`
  justify-content: center;
  display: flex;
  gap: 12px;
  margin-bottom: 120px;
`;
const LoginWrapper = styled.div`
  text-align: left;
  color: #000000;
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
