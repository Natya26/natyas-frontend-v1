import { Series } from './Series';

export type ItemType = {
  id?: string;
  name?: string;
};

export type NewAndHotResponse = {
  err?: boolean;
  msg?: string | null;
  data?: { items?: ItemType[]; Series?: Series[] };
  details: any;
};
