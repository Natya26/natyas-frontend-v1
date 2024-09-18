import { LoginUserRequest } from 'services/openapi/models/LoginUserRequest';
import { ResendOtpRequest } from 'services/openapi/models/ResendOtpRequest';
import { Series } from 'services/openapi/models/Series';
import { SignInUserRequest } from 'services/openapi/models/SignInUserRequest';
import { SocialLoginRequest } from 'services/openapi/models/SocialLoginRequest';
import { OTPLessSignUpRequest } from 'services/openapi/models/OTPLessSignUpRequest';

/* --- STATE --- */
export interface ManageLoginState {
  signInUserPayload?: SignInUserRequest;
  socialLoginPayload?: SocialLoginRequest;
  loginUserPayload?: LoginUserRequest;
  resendOtpPayload?: ResendOtpRequest;
  otplessSignUpPayload?: OTPLessSignUpRequest;
  signUp?: boolean;
}
