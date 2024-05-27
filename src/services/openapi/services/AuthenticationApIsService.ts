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
