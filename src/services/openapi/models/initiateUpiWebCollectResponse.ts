export type checkCustomerVpaResponseData = {
  orderId?: string | null;
  customerVpa?: string | null;
  customerName?: string | null;
  status?: string | null;
};

export type initiateUpiWebCollectResponse = {
  err?: boolean;
  msg?: string | null;
  data?: any;
  details?: any;
};
