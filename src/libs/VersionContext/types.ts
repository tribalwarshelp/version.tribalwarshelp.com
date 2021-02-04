import { List } from 'libs/graphql/types';

export type Version = {
  code: string;
  host: string;
  name: string;
  timezone: string;
};

export type VersionList = {
  versions?: List<Version[]>;
};
