export type checkCustomerVpaResponseData = {
  orderId?: string | null;
  customerVpa?: string | null;
  customerName?: string | null;
  status?: string | null; //default values   "status": "Available" | "status": "Not Available"
};

export type checkCustomerVpaResponse = {
  err?: boolean;
  msg?: string | null;
  data?: checkCustomerVpaResponseData;
  details?: any;
};
