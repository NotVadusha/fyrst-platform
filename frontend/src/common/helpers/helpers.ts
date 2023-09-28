export { cn } from './merge-classnames/merge-classnames.helper';

export function calculateTotalPages({ limit, totalCount }: { limit: number; totalCount?: number }) {
  return totalCount ? Math.ceil(totalCount / limit) : 0;
}
