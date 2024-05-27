import { Subscription } from './Subscription';
import { SubscriptionPlan } from './SubscriptionPlan';

export type GetSubscriptionPlanResponse = {
  err?: boolean;
  msg?: string;
  data?: { status: string; subscription?: Subscription };
  details?: any;
};
