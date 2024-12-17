import { format, isToday, parseISO } from 'date-fns';

export const formatDate = (date: string): string => {
  return format(parseISO(date), 'MMM d, yyyy');
};

export const canEdit = (date: string): boolean => {
  return isToday(parseISO(date));
};