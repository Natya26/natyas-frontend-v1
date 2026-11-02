import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import googleImg from './assets/google_login.png';
import { NumberField } from 'app/components/NumberField';
import { MExtensionField } from 'app/components/MExtensionField';
import { NatyaWordmark } from 'app/components/NatyaWordmark';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import { LoginButton } from 'app/components';
import GoogleButton from 'app/components/GoogleButton';
import Form from 'app/components/Form';
import { LoginOtp } from 'app/components/LoginOtp';
import useApi from 'services/mavapi/useApi';
import { ApiError, AuthenticationApIsService } from 'services/openapi';
import {
  selectLoginUserPayload,
  selectSignInUserPayload,
  selectSocialLoginPayload,
} from 'app/layouts/OnboardLayout/slice/selectors';
import useToast from 'hooks/Toast';
import { useManageLoginSlice } from '../../layouts/OnboardLayout/slice';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useManageAppSlice } from '../slice';
import Cookies from 'js-cookie';
import SimpleReactValidator from 'simple-react-validator';
import { LoginWhatsappButton } from 'app/components/LoginWhatsappButton';
import { LoginWhatsapp } from 'app/components/LoginWhatsapp';

interface Props {}

export const LoginPhone = () => {
  //Api Services
  const { authLogin, socialSignup, otplessWhatsappLogin, otplessVerifyToken } =
    AuthenticationApIsService;
  const { error: apiError, isLoading, handleRequest } = useApi();

  //Slice Actions
  const { actions } = useManageLoginSlice();
  const { actions: appSliceActions } = useManageAppSlice();

  //Redux dispatch
  const dispatch = useDispatch();

  //Redux Selectors
  const signInPayload = useSelector(selectSignInUserPayload);
  const socialSigninPayload = useSelector(selectSocialLoginPayload);
  const LoginUserPayload = useSelector(selectLoginUserPayload);
  //Toast
  const { setOffToast } = useToast();
  // Hook to access the current URL location
  const location = useLocation();
  const loginPayLoad = useSelector(selectLoginUserPayload);

  // State to handle the login type and views
  const [loginType, setLoginType] = useState<string>(''); // 'OTP' or 'WHATSAPP'
  const [otpView, setOtpView] = useState<boolean>(false);
  const [codeView, setCodeView] = useState<boolean>(false);
  const navigate = useNavigate();
  //Logout Fn
  const handleGotoSignUp = () => {
    navigate(RoutePath.signup.path);
  };
  const handlePhoneCodeChange = e => {
    dispatch(actions.changePhoneCode(e.target.value));
    dispatch(actions.setResendOtpNumberCode(e.target.value));
  };

  const handlePhoneChange = e => {
    dispatch(actions.changeLoginUsername(e.target.value));
    dispatch(actions.setResendOtpNumber(e.target.value));
  };
  const [soon, setSoon] = useState<boolean>(true);
  const handleLogin = () => {
    if (simpleValidator?.current?.allValid()) {
      handleRequest(authLogin(loginPayLoad)).then(res => {
        if (res && !(res instanceof ApiError) && !res.err) {
          setLoginType('OTP');
        } else {
          setOffToast('error', 'User not found ');
        }
      });
    } else {
      simpleValidator.current.showMessages();
      setSoon(!soon);
    }
  };

  const handleLoginWithGoogle = res => {
    if (res) {
      handleRequest(
        socialSignup({
          token: res?.credential,
          type: 'GOOGLE',
          clientType: 'web',
        }),
      ).then(res => {
        if (res.data) {
          setOffToast('success', 'Login was successful');
          Cookies.set('idToken', res?.data?.idToken);
          Cookies.set('accessToken', res?.data?.accessToken);
          Cookies.set('refreshToken', res?.data?.refreshToken);
          //encoded data
          let userId = btoa(res?.data?.user?.id);
          let userName = btoa(res?.data?.user?.first_name);
          let userEmail = btoa(res?.data?.user?.email);
          let userPhoto = btoa(res?.data?.user?.photo);
          //Setting encoded data to cookies
          Cookies.set('userId', userId);
          Cookies.set('userName', userName);
          Cookies.set('userEmail', userEmail);
          Cookies.set('userPhoto', userPhoto);
          dispatch(appSliceActions.setIsAuthenticated(true));
          dispatch(appSliceActions.setRedirectPath(RoutePath.settings.path));
          navigate(RoutePath.homepage.path);
        } else {
          setOffToast('error', 'Something went wrong');
        }
      });
    }
  };

  const handleWhatsappLogin = () => {
    localStorage.setItem('phone', loginPayLoad?.username?.toString() ?? '');
    if (simpleValidator?.current?.allValid()) {
      setLoginType('WHATSAPP'); // Set state to WhatsApp login type
      handleRequest(
        otplessWhatsappLogin({
          phone: loginPayLoad?.username,
          phone_code: loginPayLoad?.phone_code,
          type: 'WHATSAPP',
        }),
      ).then(res => {
        if (res && !(res instanceof ApiError) && !res.err) {
          if (res.data) {
            let obtainedToken = res.data.requestIds[0].value;
            console.log(res.data);
            localStorage.setItem('token', obtainedToken.toString());
          } else {
            setOffToast('error', 'Something went wrong, Retry again');
          }
        } else {
          setOffToast('error', 'User not found Register to continue ');
        }
      });
    } else {
      simpleValidator.current.showMessages();
      setSoon(!soon);
    }
  };
  const verifyToken = (res, phone) => {
    setLoginType('WHATSAPP');
    if (res) {
      handleRequest(
        otplessVerifyToken({
          token: res,
          phone: phone,
          phone_code: loginPayLoad?.phone_code,
        }),
      ).then(res => {
        if (res.data) {
          console.log(res.data);

          if (res && !(res instanceof ApiError) && !res.err) {
            setOffToast('success', 'Successfully Logged In');
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
            setOffToast('error', 'Something went wrong');
          }
        }
      });
    }
  };
  useEffect(() => {
    // Extract the 'code' parameter from the URL
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code'); // If coming from WhatsApp, there will be a code
    // Only run this effect if there is a 'code' in the URL (i.e., redirected from WhatsApp)
    if (code) {
      // Send the request to the backend for verification
      const savedToken = localStorage.getItem('token');
      const phone = localStorage.getItem('phone');
      console.log(savedToken, phone);
      verifyToken(savedToken, phone);
    }
  }, [location.search]);

  const simpleValidator = React.useRef(new SimpleReactValidator());

  useEffect(() => {
    dispatch(actions.changeLoginType('SEND_OTP'));
    dispatch(actions.changeLoginUsername(''));
  }, []);
  return (
    <NumberWrapper>
      <div>
        <LeftLogoWrapper>
          <NatyaWordmark />
        </LeftLogoWrapper>
      </div>
      {loginType === '' && (
        <Box>
          <div>
            <HeadingWrapper>Welcome back</HeadingWrapper>
            <ParaWrapper>Login to view more exclusive content</ParaWrapper>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                margin: '8px 0px',
              }}
            >
              <GoogleLogin
                onSuccess={response => {
                  console.log(response);
                  handleLoginWithGoogle(response);
                }}
                theme="filled_black"
                auto_select={false}
                text="continue_with"
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Box>
            <StyledDivider className="section-divider">Or</StyledDivider>
          </div>
          <Box sx={TextBoxStyles}>
            <Box sx={FormBoxStyles}>
              <Form>
                <Box>
                  <Box sx={ContactBox}>
                    <StyledExtensionField
                      placeholder="Code"
                      value={loginPayLoad?.phone_code}
                      onChange={e => handlePhoneCodeChange(e)}
                    />
                    <StyledNumberField
                      className="custom-num-field"
                      placeholder="Your Mobile Number"
                      onChange={e => handlePhoneChange(e)}
                      value={LoginUserPayload?.username}
                      validator={simpleValidator.current}
                      error={'Mobile Number'}
                      validations={'required|max:10|min:10'}
                    />
                  </Box>
                  <Box sx={ContactBoxButtons}>
                    <LoginButton type="button" onClick={handleLogin}>
                      Log in with OTP
                    </LoginButton>
                    <LoginWhatsappButton
                      text="Continue with Whatsapp"
                      onClick={handleWhatsappLogin}
                    />
                  </Box>
                </Box>
              </Form>
            </Box>
          </Box>

          <p
            style={{
              textDecoration: 'underline',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '100',
              cursor: 'pointer',
            }}
            onClick={handleGotoSignUp}
          >
            Not a registered user? Click here to register.
          </p>
        </Box>
      )}
      {loginType === 'OTP' && <LoginOtp />}
      {loginType === 'WHATSAPP' && (
        <LoginWhatsapp onBack={() => setLoginType('')} />
      )}
    </NumberWrapper>
  );
};

const TextBoxStyles = {
  padding: '0px !important',
};
const FormBoxStyles = {
  padding: '0px !important',
  maxWidth: '450px',
};
const ContactBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 0 0 5px',
  margin: '8px 0px',
};
const ContactBoxButtons = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 0 0 5px',
  margin: '8px 0px 8px 0px',
};
const StyledExtensionField = styled(MExtensionField)`
  padding: 0px !important;
  margin-top: 5px;
  align-self: baseline;
`;
const StyledNumberField = styled(NumberField)`
  width: 90% !important;
  &.custom-num-field {
    padding: 5px 5px 5px 2px !important;
  }
`;
const StyledDivider = styled(Divider)`
  &::before {
    border-top: thin solid #ffffff !important;
  }
  &::after {
    border-top: thin solid #ffffff !important;
  }

  span {
    color: #ffffff !important;
  }
`;
const NumberWrapper = styled.div`
  justify-content: center;
  display: flex;
  text-align: center;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
`;

const HeadingWrapper = styled.h1`
  font-family: Urbanist;
  font-weight: 900;
  font-size: 30px;
  color: #ffffff;
  margin-bottom: 0px;
  padding-top: 50px;
  @media (min-width: 480px) and (max-width: 768px) {
    font-size: 24px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    padding-top: 30px;
  }
  @media (min-width: 769px) and (max-width: 991px) {
    font-size: 30px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    padding-top: 40px;
  }
`;

const ParaWrapper = styled.p`
  font-family: Urbanist;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  margin-top: 0px;
  margin-bottom: 60px;
  padding-top: 10px;
  @media (min-width: 480px) and (max-width: 768px) {
    font-size: 13px;
    padding-top: 3px;
    margin-bottom: 45px;
    margin-top: 0px;
  }
  @media (min-width: 769px) and (max-width: 991px) {
    font-size: 16px;
    padding-top: 0px;
    margin-bottom: 45px;
    margin-top: 0px;
  } ;
`;

const MainBackgroundImg = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LeftLogoWrapper = styled.div`
  width: 300px;
  height: 125px;
  display: none;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 300px;
    height: 134px;
    display: block;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 252px;
    height: 108px;
    display: block;
  }
`;
