import { Props } from '@common/Link/Link';

export interface Route {
  name: string;
  to?: string;
  params?: Props['params'];
  Icon: React.ReactElement;
  nested?: Route[];
}
