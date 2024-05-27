import { SubscriptionPlan } from './SubscriptionPlan';

export type CreateSubscriptionPlanResponse = {
  err?: boolean;
  msg?: string;
  data?: SubscriptionPlan;
  details?: any;
};
