import { addMinutes } from 'date-fns';

const addTimezoneOffset = (d: Date): Date => {
  const offset = d.getTimezoneOffset();
  return addMinutes(d, -1 * offset);
};

export default addTimezoneOffset;
