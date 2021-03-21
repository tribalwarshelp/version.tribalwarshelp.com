import { Village as _Village } from 'libs/graphql/types';

export type Village = _Village & { fullName: string };

export type Params = {
  id: string;
  key: string;
};
