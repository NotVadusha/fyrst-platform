import { useMemo } from 'react';

export interface UseFormattedDateProps {
  dateString?: string | null;
  format?: 'dash' | 'dot';
}

export const useFormattedDate = ({ dateString, format = 'dot' }: UseFormattedDateProps): string => {
  return useMemo(() => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';

    const separator = format === 'dash' ? '-' : '.';
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(date);

    return formattedDate.replace(/\//g, separator);
  }, [dateString, format]);
};
