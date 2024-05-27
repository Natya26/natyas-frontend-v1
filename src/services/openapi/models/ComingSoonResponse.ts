import { Series } from './Series';

export type ComingSoonResponse = {
  err?: boolean;
  msg?: string | null;
  data?: Series[];
  details: any;
};
