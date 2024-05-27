/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AirpayChecksum = {
  orderid: string;
  buyerFirstName: string;
  buyerLastName: string;
  buyerEmail: string;
  amount: number;
  isocurrency: string;
  currency: 356;
  buyerPhone: string;
  buyerAddress: string;
  buyerCity: string;
  buyerState: string;
  buyerCountry: string;
  buyerPinCode: string;
  customvar: string;
  txnsubtype: string;
  chmod: string;
  checksum: string;
  mercid: string;
  privatekey: string;
}
export type GenerateChecksumResponse = {
  err?: boolean;
  msg?: string;
  data?: AirpayChecksum;
  details?: any;
};
