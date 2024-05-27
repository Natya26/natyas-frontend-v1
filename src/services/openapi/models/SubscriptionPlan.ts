import { User } from './User';

export type SubscriptionPlan = {
  id?: number;
  name?: string;
  cost?: number;
  currency?: string;
  validity?: number;
  validity_unit?: string;
  perks?: string[];
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  subscribers_count?: number;
  subscribers?: User[];
};
