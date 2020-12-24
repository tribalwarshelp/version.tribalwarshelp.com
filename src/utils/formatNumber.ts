const formatNumber = (
  variant: 'dominance' | 'commas',
  v: number | string
): string => {
  if (typeof v === 'string') {
    v = parseFloat(v);
  }
  switch (variant) {
    case 'dominance':
      return v.toFixed(2) + '%';
    case 'commas':
      return v.toLocaleString('en');
    default:
      return v + '';
  }
};

export default formatNumber;
