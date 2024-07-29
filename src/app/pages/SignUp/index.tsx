import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Grid, Box, Divider, Link } from '@mui/material';
import GoogleButton from 'app/components/GoogleButton';
import { MTextField } from 'app/components/MTextField';
import { useManageLoginSlice } from '../../layouts/OnboardLayout/slice';
import { useDispatch, useSelector } from 'react-redux';
import { ApiError, AuthenticationApIsService } from 'services/openapi';
import {
  selectSignInUserPayload,
  selectSocialLoginPayload,
} from '../../layouts/OnboardLayout/slice/selectors';
import useApi from 'services/mavapi/useApi';
import Form from 'app/components/Form';
import { LoginButton } from 'app/components';
import { NumberField } from 'app/components/NumberField';
import { MExtensionField } from 'app/components/MExtensionField';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useManageAppSlice } from '../slice';
import useToast from 'hooks/Toast';
import LeftLogo from './assets/Fusion-left-logo.png';
import SimpleReactValidator from 'simple-react-validator';

type Props = {};

const SignUp = (props: Props) => {
  //Api Services
  const { signUpUser, socialSignup } = AuthenticationApIsService;
  const { error: apiError, isLoading, handleRequest } = useApi();

  //Slice Actions
  const { actions } = useManageLoginSlice();
  const { actions: appSliceActions } = useManageAppSlice();

  //Redux dispatch
  const dispatch = useDispatch();

  //Redux Selectors
  const signInPayload = useSelector(selectSignInUserPayload);
  const socialSigninPayload = useSelector(selectSocialLoginPayload);
  //Toast
  const { setOffToast } = useToast();

  const handleNameChange = e => {
    dispatch(actions.changeName(e.target.value));
  };
  const handleEmailChange = e => {
    dispatch(actions.changeEmail(e.target.value));
  };
  const handlePhoneCodeChange = e => {
    dispatch(actions.changePhoneCode(e.target.value));
  };

  const handlePhoneChange = e => {
    dispatch(actions.changePhone(e.target.value));
  };
  const simpleValidator = React.useRef(new SimpleReactValidator());
  const [soon, setSoon] = useState<boolean>(true);
  const handleSignupUser = () => {
    if (simpleValidator?.current?.allValid()) {
      handleRequest(signUpUser(signInPayload)).then(res => {
        if (res.msg === 'Signup Success') {
          let userId = btoa(res?.data?.result.navarasaUser.id);
          Cookies.set('userId', userId);
          navigate(RoutePath.login.path);
          setOffToast('success', 'Account created Successfully');
        } else if ((res.msg = 'Phone Number/Email Already In Use')) {
          setOffToast('error', 'Phone Number/Email Already In Use');
        }
      });
    } else {
      simpleValidator.current.showMessages();
      setSoon(!soon);
    }
  };
  const navigate = useNavigate();
  //Logout Fn
  const handleGotoLogin = () => {
    navigate(RoutePath.login.path);
  };

  const handleSignUpWithGoogle = res => {
    if (res) {
      handleRequest(
        socialSignup({ token: res?.credential, type: 'GOOGLE' }),
      ).then(res => {
        if (res.data) {
          setOffToast('success', 'Signed in  Successfully');
          Cookies.set('idToken', res?.data?.idToken);
          Cookies.set('accessToken', res?.data?.accessToken);
          Cookies.set('refreshToken', res?.data?.refreshToken);
          let userId = btoa(res?.data?.user?.id);
          Cookies.set('userId', userId);
          dispatch(appSliceActions.setIsAuthenticated(true));
          dispatch(appSliceActions.setRedirectPath(RoutePath.settings.path));
          // navigate(RoutePath.homepage.path);
          // Changed for fusion
          navigate(RoutePath.fusionhomepage.path);
        } else {
          setOffToast('error', 'Something went wrong');
        }
      });
    }
  };
  useEffect(() => {
    dispatch(actions.changeName(''));
    dispatch(actions.changeEmail(''));
    dispatch(actions.changePhone(''));
  }, []);

  return (
    <NumberWrapper>
      <div>
        <LeftLogoWrapper src={LeftLogo} />
      </div>
      <Box>
        <Box>
          <HeadingOneWrapper>
            Exclusive content, wherever you go 
          </HeadingOneWrapper>
          <ParaOneWrapper>Create a free account.</ParaOneWrapper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '8px 0px',
          }}
        >
          <GoogleLogin
            // useOneTap={false}
            text="signin"
            onSuccess={response => {
              console.log(response);
              handleSignUpWithGoogle(response);
            }}
            theme="filled_black"
            auto_select={false}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>
        <StyledDivider className="section-divider">Or</StyledDivider>
        <Box sx={TextBoxStyles}>
          <Box sx={FormBoxStyles}>
            <Form>
              <Box>
                <MTextField
                  placeholder="Name"
                  onChange={e => handleNameChange(e)}
                  value={signInPayload?.first_name}
                  validator={simpleValidator.current}
                  error={'Name'}
                  validations={'required|alpha_space'}
                />
                <MTextField
                  placeholder="E-mail ID"
                  value={signInPayload?.email}
                  onChange={e => handleEmailChange(e)}
                  validator={simpleValidator.current}
                  error={'E-mail'}
                  validations={'required|email'}
                />
                <Box sx={ContactBox}>
                  <StyledExtensionField
                    placeholder="Code"
                    value={signInPayload?.phone_code}
                    onChange={e => handlePhoneCodeChange(e)}
                  />
                  <StyledNumberField
                    className="custom-num-field"
                    placeholder="Your Mobile Number"
                    value={signInPayload?.phone}
                    onChange={e => handlePhoneChange(e)}
                    validator={simpleValidator.current}
                    error={'Mobile Number'}
                    validations={'required|max:10|min:10'}
                  />
                </Box>
                <Box sx={ContactBox}>
                  <LoginButton type="button" onClick={handleSignupUser}>
                    Create Account
                  </LoginButton>
                </Box>
                <LinkWrapper>
                  <ParaTwoWrapper onClick={handleGotoLogin}>
                    Already registered? Click here to log in,
                  </ParaTwoWrapper>
                </LinkWrapper>
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </NumberWrapper>
  );
};
const NumberWrapper = styled.div`
  justify-content: center;
  display: flex;
  text-align: center;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
`;

const HeadingOneWrapper = styled.h2`
  color: #ffffff;
  text-align: center;
  font-family: Urbanist;
  margin: 30px 0px 0px 0px;
  font-size: 22px;
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 20px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 19px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 18px;
    margin: 20px 0px 0px 0px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 17px;
  }
`;
const ParaOneWrapper = styled.p`
  color: #ffffff;
  text-align: center;
  letter-spacing: 1px;
  font-family: Urbanist;
  margin: 2px 0px;
  padding-bottom: 25px;
  font-size: 16px;
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 15px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 15px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 13px;
  }
`;
const ParaTwoWrapper = styled.p`
  text-decoration: underline;
  color: #ffffff;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 15px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 15px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 14px;
    margin: 0px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 13px;
    margin: 0px;
  }
`;
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
  margin: '10px 0px',
};
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

const StyledExtensionField = styled(MExtensionField)`
  padding: 0px !important;
  margin-top: 5px;
  align-self: baseline;
`;
const StyledNumberField = styled(NumberField)`
  width: 100%;
  &.custom-num-field {
    padding: 5px 5px 5px 2px !important;
  }
`;
const LinkWrapper = styled.div`
  padding: 10px 0px;
  text-align: center;
  margin: 30px 0 10px 0;
  @media (min-width: 576px) and (max-width: 767px) {
    margin: 30px 0 0 0;
    padding: 0px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    margin: 30px 0 0px 0;
    padding: 0px;
  }
  .MuiLink-root {
    color: #ffffff !important;
    text-decoration-color: #ffffff !important;
    letter-spacing: 0.5px;
  }
`;
const LeftLogoWrapper = styled.img`
  width: 300px;
  height: 125px;
  display: none;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 220px;
    height: 85px;
    display: block;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 200px;
    height: 80px;
    display: block;
  }
`;

export default SignUp;
