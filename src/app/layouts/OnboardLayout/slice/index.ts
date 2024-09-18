import { PayloadAction } from '@reduxjs/toolkit';
import { Cast } from 'services/openapi/models/Cast';
import { Genre } from 'services/openapi/models/Genre';
import { Language } from 'services/openapi/models/Language';
import { Series } from 'services/openapi/models/Series';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageLoginState } from './types';

export const initialState: ManageLoginState = {
  signInUserPayload: {
    first_name: '',
    phone_code: '+91',
    phone: '',
    email: '',
    type: 'SUBSCRIBER',
  },
  loginUserPayload: {
    type: 'SEND_OTP',
    username: '',
    phone_code: '+91',
    otp: '',
  },
  signUp: true,
  socialLoginPayload: {
    token: '',
    type: 'GOOGLE',
  },
  resendOtpPayload: {
    phone_code: '+91',
    phone: '',
  },
  otplessSignUpPayload: {
    first_name: '',
    phone_code: '+91',
    phone: '',
    email: '',
    type: 'SUBSCRIBER',
  },
};

const slice = createSlice({
  name: 'manageLogin',
  initialState,
  reducers: {
    setSignUpView(state, action: PayloadAction<boolean>) {
      state.signUp = action.payload;
    },
    changeName(state, action: PayloadAction<string>) {
      if (state.signInUserPayload) {
        state.signInUserPayload.first_name = action.payload;
      }
    },
    changePhone(state, action: PayloadAction<string>) {
      if (state.signInUserPayload) {
        state.signInUserPayload.phone = action.payload;
      }
    },
    changePhoneCode(state, action: PayloadAction<string>) {
      if (state.signInUserPayload) {
        state.signInUserPayload.phone_code = action.payload;
      }
    },

    changeEmail(state, action: PayloadAction<string>) {
      if (state.signInUserPayload) {
        state.signInUserPayload.email = action.payload;
      }
    },
    otplesschangeName(state, action: PayloadAction<string>) {
      if (state.otplessSignUpPayload) {
        state.otplessSignUpPayload.first_name = action.payload;
      }
    },
    otplesschangePhone(state, action: PayloadAction<string>) {
      if (state.otplessSignUpPayload) {
        state.otplessSignUpPayload.phone = action.payload;
      }
    },
    otplesschangePhoneCode(state, action: PayloadAction<string>) {
      if (state.otplessSignUpPayload) {
        state.otplessSignUpPayload.phone_code = action.payload;
      }
    },

    otplesschangeEmail(state, action: PayloadAction<string>) {
      if (state.otplessSignUpPayload) {
        state.otplessSignUpPayload.email = action.payload;
      }
    },
    changeLoginUsername(state, action: PayloadAction<string>) {
      if (state.loginUserPayload) {
        state.loginUserPayload.username = action.payload;
      }
    },
    changeLoginType(state, action: PayloadAction<string>) {
      if (state.loginUserPayload) {
        state.loginUserPayload.type = action.payload;
      }
    },
    changeLoginCountryCode(state, action: PayloadAction<string>) {
      if (state.loginUserPayload) {
        state.loginUserPayload.phone_code = action.payload;
      }
    },
    changeLoginOtp(state, action: PayloadAction<string>) {
      if (state.loginUserPayload) {
        state.loginUserPayload.otp = action.payload;
      }
    },
    setsocialLoginToken(state, action: PayloadAction<string>) {
      if (state.socialLoginPayload) {
        state.socialLoginPayload.token = action.payload;
      }
    },
    setsocialLoginType(
      state,
      action: PayloadAction<'GOOGLE' | 'FACEBOOK' | undefined>,
    ) {
      if (state.socialLoginPayload) {
        state.socialLoginPayload.type = action.payload;
      }
    },
    setResendOtpNumber(state, action: PayloadAction<string>) {
      if (state.resendOtpPayload) {
        state.resendOtpPayload.phone = action.payload;
      }
    },
    setResendOtpNumberCode(state, action: PayloadAction<string>) {
      if (state.resendOtpPayload) {
        state.resendOtpPayload.phone_code = action.payload;
      }
    },
  },
});

export const { actions: manageLoginActions } = slice;

export const useManageLoginSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
