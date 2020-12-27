export const encodeMarker = (id: number, color: string): string => {
  return encodeURIComponent(id + ',' + color);
};
