export type Subscription = {
  id: number;
  subscription_plan_id: number;
  user_id: string;
  valid_from: string;
  valid_till: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};
