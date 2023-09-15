import { useMemo } from 'react';

export interface UseFormattedDateProps {
  dateString?: string | Date | null;
  format?: 'dash' | 'dot';
  locale?: string;
}

export const useFormattedDate = ({
  dateString,
  format = 'dot',
  locale = 'de-DE',
}: UseFormattedDateProps): string => {
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

    const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);

    return formattedDate.replace(/\//g, separator);
  }, [dateString, format, locale]);
};
