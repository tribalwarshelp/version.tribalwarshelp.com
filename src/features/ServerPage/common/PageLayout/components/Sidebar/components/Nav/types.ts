export interface Route {
  name: string;
  to?: string;
  Icon: React.ReactElement;
  nested?: Route[];
}
