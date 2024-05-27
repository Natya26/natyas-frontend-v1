/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Subscription } from './Subscription';
import { SubscriptionPlan } from './SubscriptionPlan';

export type User = {
  id?: string;
  authType?: string;
  authId?: string;
  type?: string;
  photo?: string;
  active?: boolean;
  lastLogin?: string;
  admin?: boolean;
  created_at?: string;
  updated_at?: string;
  user_type?: string;
  phone_number?: string;
  country_code?: string;
  email_verified?: boolean;
  email?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  date_of_birth?: string;
  phone_code?: string;
  is_restricted?: boolean;
  restricted_for?: string;
  hasActiveSubscription?: boolean;
  my_list_count?: number;
  likes_count?: number;
  phoneNumberVerfied?: boolean;
  subscriptionPlan?: SubscriptionPlan;
  subscription?: Subscription;
};
