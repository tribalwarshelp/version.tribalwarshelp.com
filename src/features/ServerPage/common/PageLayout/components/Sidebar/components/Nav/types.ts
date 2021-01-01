import { Props } from '@common/Link/Link';

export interface Route {
  name: string;
  to?: string;
  exact?: boolean;
  params?: Props['params'];
  Icon: React.ReactElement;
  nested?: Route[];
  isExpandable?: boolean;
}
