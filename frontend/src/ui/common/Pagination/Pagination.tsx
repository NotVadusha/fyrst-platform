import React from 'react';
import { ReactComponent as ChevronLeft } from '../../../icons/chevron-left.svg';
import { ReactComponent as ChevronRight } from '../../../icons/chevron-right.svg';
import { PaginationButton } from './PaginationButton';

export interface PaginationProps {
  /** Current page */
  value: number;
  /** Total amount of pages */
  totalCount: number;
  /** Amount of page buttons to show on each side of the current page button  */
  siblingsCount: number;
  /** Fires every time the current page changes */
  onChange: (currentPage: number) => void;
}

export function Pagination({ value, totalCount, siblingsCount, onChange }: PaginationProps) {
  let start: number;
  const visibleCount = 1 + siblingsCount * 2;

  if (value <= siblingsCount) {
    start = 1;
  } else if (totalCount - value <= siblingsCount) {
    start = Math.max(totalCount - siblingsCount * 2, 1);
  } else {
    start = value - siblingsCount;
  }

  const visiblePages: number[] = [];
  for (let i = Math.max(start, 1); i < Math.min(start + visibleCount, totalCount + 1); i++) {
    visiblePages.push(i);
  }

  return (
    <div className='flex items-center justify-center'>
      <PaginationButton onClick={() => onChange(value - 1)} disabled={value === 1}>
        <ChevronLeft className='w-6 h-6 inline-block' />
      </PaginationButton>
      <ul className='flex'>
        {visiblePages.map(page => (
          <li key={page}>
            <PaginationButton
              onClick={() => onChange(page)}
              appearance={page === value ? 'active' : 'base'}
            >
              {page}
            </PaginationButton>
          </li>
        ))}
      </ul>
      <PaginationButton onClick={() => onChange(value + 1)} disabled={value === totalCount}>
        <ChevronRight className='w-6 h-6 inline-block' />
      </PaginationButton>
    </div>
  );
}
