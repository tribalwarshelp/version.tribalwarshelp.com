const formatNumber = (type: 'dominance', v: number | string): string => {
  switch (type) {
    case 'dominance':
      if (typeof v === 'string') {
        v = parseFloat(v);
      }
      return v.toFixed(2) + '%';
    default:
      return v + '';
  }
};

export default formatNumber;
