/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentIntendRequest = {
  subscription_plan_id?: number;
  payment_gateway?: string; //default value is 'STRIPE'
};
