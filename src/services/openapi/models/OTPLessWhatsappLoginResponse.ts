import { User } from './User';

export type OTPLessWhatsppLoginResponse = {
  err?: boolean;
  msg?: string | null;
  data?: {
    user?: User;
  } | null;
  details: any;
};
