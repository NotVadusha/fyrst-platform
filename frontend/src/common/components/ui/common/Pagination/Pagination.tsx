import React from 'react';
import { ReactComponent as ChevronLeft } from 'src/assets/icons/chevron-left.svg';
import { ReactComponent as ChevronRight } from 'src/assets/icons/chevron-right.svg';
import { ReactComponent as DoubleChevronLeft } from 'src/assets/icons/double-chevron-left.svg';
import { ReactComponent as DoubleChevronRight } from 'src/assets/icons/double-chevron-right.svg';
import { PaginationButton } from './PaginationButton';

export interface PaginationProps {
  value: number;
  totalCount: number;
  siblingsCount: number;
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
      <PaginationButton onClick={() => onChange(1)} disabled={value === 1}>
        <DoubleChevronLeft className='w-6 h-6 font-semibold inline-block' />
      </PaginationButton>
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
      <PaginationButton onClick={() => onChange(totalCount)} disabled={value === totalCount}>
        <DoubleChevronRight className='w-6 h-6 font-semibold inline-block' />
      </PaginationButton>
    </div>
  );
}
