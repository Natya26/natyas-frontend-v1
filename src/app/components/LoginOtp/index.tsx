import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { useEffect } from 'react';
import { LoginButton } from '../LoginButton';
import Grid from '@mui/material/Unstable_Grid2';
import { useRef } from 'react';
import { padding } from '@mui/system';
import background from './asset/img/Otp_one.png';
import useApi from 'services/mavapi/useApi';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import Cookies from 'js-cookie';
import { ApiError, AuthenticationApIsService } from 'services/openapi';
import { useManageLoginSlice } from '../../layouts/OnboardLayout/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginUserPayload,
  selectResendOtpPayload,
} from 'app/layouts/OnboardLayout/slice/selectors';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from 'app/pages/slice/selectors';
import { useManageAppSlice } from 'app/pages/slice';
import useToast from 'hooks/Toast';

interface Props {
  onChange?: (otp: string) => void;
}

export const LoginOtp = ({ onChange }: Props) => {
  const { actions: appSliceActions } = useManageAppSlice();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [values, setValues] = useState<string[] | undefined>(
    new Array(4).fill(''),
  );
  const navigate = useNavigate();
  const { setOffToast } = useToast();
  const { actions } = useManageLoginSlice();
  const { error: apiError, isLoading, handleRequest } = useApi();
  const [error, setError] = React.useState<unknown | null>();
  const { authLogin, authOtpResend } = AuthenticationApIsService;
  const loginPayLoad = useSelector(selectLoginUserPayload);
  const resendOtppayload = useSelector(selectResendOtpPayload);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const dispatch = useDispatch();
  const handleChange = (index: number, value: string) => {
    const newValues = [...values!];
    if (values) {
      newValues[index] = value;
      setValues(newValues);
      const otp = newValues.join('');
      if (otp.length === 4) {
        // onChange?.(otp);
        dispatch(actions.changeLoginOtp(otp));
        return;
      }
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && values && !values[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

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

  useEffect(() => {
    dispatch(actions.changeLoginType('VERIFY_OTP'));
  }, []);
  const handleSubmit = () => {
    handleRequest(authLogin(loginPayLoad))
      .then(res => {
        console.log(res, 'err');
        if (res && !(res instanceof ApiError) && !res.err) {
          Cookies.set('idToken', res?.data?.idToken);
          Cookies.set('accessToken', res?.data?.accessToken);
          Cookies.set('refreshToken', res?.data?.refreshToken);
          //encoded data
          let userId = res?.data?.user?.id ? btoa(res?.data?.user?.id) : '';
          let userName = res?.data?.user?.first_name
            ? btoa(res?.data?.user?.first_name)
            : '';
          let userEmail = res?.data?.user?.email
            ? btoa(res?.data?.user?.email)
            : '';
          let userPhoto = res?.data?.user?.photo
            ? btoa(res?.data?.user?.photo)
            : '';
          //Setting encoded data to cookies
          Cookies.set('userId', userId);
          Cookies.set('userName', userName);
          Cookies.set('userEmail', userEmail);
          Cookies.set('userPhoto', userPhoto);
          dispatch(appSliceActions.setIsAuthenticated(true));
          dispatch(appSliceActions.setRedirectPath(RoutePath.settings.path));
          navigate(RoutePath.homepage.path);
        } else {
          alert('Error Msg: Invalid');
          setOffToast('error', 'Invalid OTP entered');
        }
      })
      .catch(error => {
        setError(apiError);
      });
  };

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
            Enter 4-digit OTP sent to your mobile number
          </p>
          <Box component="form" noValidate autoComplete="off">
            <MainWrapper>
              <LoginWrapper>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {Array.from(Array(4).keys())?.map(index => (
                    <input
                      key={index}
                      type="text"
                      id="otpField"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      maxLength={1}
                      style={{
                        width: '47px',
                        height: '60px',
                        borderRadius: '10px',
                        backgroundColor: '#4E4E4E',
                        color: '#FFFFFF',
                        padding: '15px',
                        border: 'none',
                      }}
                      value={values && values[index]}
                      onChange={event =>
                        handleChange(index, event.target.value)
                      }
                      onKeyDown={event => handleKeyDown(index, event)}
                      ref={el => (inputRefs.current[index] = el!)}
                    />
                  ))}
                </div>
              </LoginWrapper>
            </MainWrapper>
          </Box>
          <p
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
          )}
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
