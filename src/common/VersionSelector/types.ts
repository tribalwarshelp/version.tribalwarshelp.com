import { List } from '@libs/graphql/types';

export type LangVersion = {
  tag: string;
  host: string;
};

export type LangVersionList = {
  langVersions?: List<LangVersion[]>;
};
