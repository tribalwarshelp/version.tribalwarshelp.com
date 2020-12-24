export type Action<T> = {
  icon: React.ReactNode | ((row: T, i: number) => React.ReactNode);
  tooltip?: string;
};

export type Column<T = any> = {
  field: string;
  label?: string;
  sortable?: boolean;
  valueFormatter?: (v: T, i: number) => React.ReactNode;
  disablePadding?: boolean;
  type?: 'normal' | 'datetime' | 'date';
  align?: 'left' | 'right' | 'center';
};

export type OrderDirection = 'asc' | 'desc';
