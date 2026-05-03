import { format, parseISO } from 'date-fns';

export const safeFormat = (d: string, formatStr: string = 'MMM d, yyyy') => {
  if (!d) return '';
  try {
    return format(parseISO(d), formatStr);
  } catch {
    return d;
  }
};
