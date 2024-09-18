import { User } from './User';

export type OTPLessVerifyTokenResponse = {
  err?: boolean;
  msg?: string | null;
  data?: {
    accessToken?: string | null;
    idToken?: string | null;
    refreshToken?: string | null;
    user?: User;
  } | null;
  details: any;
};
