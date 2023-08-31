import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, PaginationProps } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  render(args) {
    return <PaginationWithHooks {...args} />;
  },
  args: {
    value: 1,
    siblingsCount: 2,
    totalCount: 10,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function PaginationWithHooks(props: PaginationProps) {
  const [page, setPage] = useState<number>(1);

  return (
    <div className='w-32'>
      <Pagination {...props} onChange={currentPage => setPage(currentPage)} value={page} />
    </div>
  );
}

export const Default: Story = {};
