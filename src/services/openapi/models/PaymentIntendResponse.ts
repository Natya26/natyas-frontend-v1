/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentIntendData = {
  paymentIntent: string;
  paymentId?: number;
  publishableKey?: string;
  paymentGateway?: string; //default value "STRIPE"
};
export type PaymentIntendResponse = {
  err?: boolean;
  msg?: string;
  data?: PaymentIntendData;
  details?: any;
};
