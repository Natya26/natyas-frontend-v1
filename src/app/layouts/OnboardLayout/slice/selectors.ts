import { RootState } from 'types';

export const selectSignUp = (state: RootState) => state.manageLogin?.signUp;
export const selectSignInUserPayload = (state: RootState) =>
  state.manageLogin?.signInUserPayload;
export const selectSocialLoginPayload = (state: RootState) =>
  state.manageLogin?.socialLoginPayload;
export const selectLoginUserPayload = (state: RootState) =>
  state.manageLogin?.loginUserPayload;
  export const selectResendOtpPayload = (state: RootState) =>
  state.manageLogin?.resendOtpPayload;