import { List } from '@libs/graphql/types';

export type LangVersion = {
  tag: string;
};

export type LangVersionList = {
  langVersions?: List<LangVersion[]>;
};
