export type Action = {
  icon: React.ReactNode;
  tooltip?: string;
};

export type Column = {
  field: string;
  label?: string;
  sortable?: boolean;
  valueFormatter?: (v: boolean | string | number) => boolean | string | number;
  disablePadding?: boolean;
  type?: 'normal' | 'datetime' | 'date';
  align?: 'left' | 'right' | 'center';
};

export type OrderDirection = 'asc' | 'desc';
