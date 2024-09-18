/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { Tokens } from '../models/Tokens';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { LoginResponse } from '../models/LoginResponse';
import { SignInUserRequest } from '../models/SignInUserRequest';
import { SignInUserResponse } from '../models/SignInUserResponse';
import { LogoutResponse } from '../models/LogoutResponse';
import { SocialLoginRequest } from '../models/SocialLoginRequest';
import { SocialLoginResponse } from '../models/SocialLoginResponse';
import { ResendOtpRequest } from '../models/ResendOtpRequest';
import { OTPLessSignUpRequest } from '../models/OTPLessSignUpRequest';
import { OTPLessSignUpResponse } from '../models/OTPLessSignUpResponse';
import { OTPLessWhatsppLoginRequest } from '../models/OTPLessWhatsppLoginRequest';
import { OTPLessWhatsppLoginResponse } from '../models/OTPLessWhatsappLoginResponse';
import { OTPLessVerifyTokenRequest } from '../models/OTPLessVerifyTokenRequest';
import { OTPLessVerifyTokenResponse } from '../models/OTPLessVerifyTokenResponse';

export class AuthenticationApIsService {
  /**
   * API to login a user with username and password
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static socialSignup(
    requestBody?: SocialLoginRequest,
  ): CancelablePromise<SocialLoginResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/social-login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to login a user with username and password
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static signUpUser(
    requestBody?: SignInUserRequest,
  ): CancelablePromise<SignInUserResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/app/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API to login a user with username and password
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static otplessSignUpUser(
    requestBody?: OTPLessSignUpRequest,
  ): CancelablePromise<OTPLessSignUpResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/app/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to login a user with username and password
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static otplessVerifyToken(
    requestBody?: OTPLessVerifyTokenRequest,
  ): CancelablePromise<OTPLessVerifyTokenResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/verify-token',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * API to login a user with username and password
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static authLogin(
    requestBody?: Login,
  ): CancelablePromise<LoginResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/app/login-with-otp',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * API to login a user with whatsapp magic link
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static otplessWhatsappLogin(
    requestBody?: OTPLessWhatsppLoginRequest,
  ): CancelablePromise<OTPLessWhatsppLoginResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/app/login-with-whatsapp',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

   /**
   * API to resend otp
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */ 
  public static authOtpResend(
    requestBody:ResendOtpRequest,
):CancelablePromise<LoginResponse>{
    return __request(OpenAPI,{
     method:'POST',
     url:'/verify/phone/resend',
     body:requestBody,
     mediaType:'application/json',
    })
}

  /**
   * API to refresh tokens
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static logoutUser(): CancelablePromise<LogoutResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/logout',
    });
  }
  /**
   * API to refresh tokens
   * @param requestBody
   * @returns Tokens Success
   * @throws ApiError
   */
  public static authRefresh(requestBody?: Tokens): CancelablePromise<Tokens> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/refresh',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
