import { List } from '@libs/graphql/types';

export type Version = {
  code: string;
  host: string;
};

export type VersionList = {
  versions?: List<Version[]>;
};
