import type { Meta, StoryObj } from '@storybook/react';
import Table, { ColumnInfo } from './Table';
import React from 'react';

interface SampleUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const columns: ColumnInfo<SampleUser>[] = [
  {
    columnName: 'First name',
    renderCell(item) {
      return item.firstName;
    },
  },
  {
    columnName: 'Last name',
    renderCell(item) {
      return item.lastName;
    },
  },
  {
    columnName: 'Age',
    renderCell(item) {
      return item.age;
    },
  },
];

const items: SampleUser[] = [];
for (let i = 1; i < 6; i++) {
  items.push({
    id: i,
    firstName: `Name ${i}`,
    lastName: `Surname ${i}`,
    age: 20 + i,
  });
}

const meta: Meta<typeof Table<SampleUser>> = {
  title: 'ui/common/Table',
  component: Table<SampleUser>,
  args: {
    items,
    columns,
    getRowId: item => item.id,
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
    },
    columns: {
      control: false,
    },
    getRowId: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const columnsWithCallback: ColumnInfo<SampleUser>[] = [
  ...columns,
  {
    columnName: 'Full name',
    width: 'w-64',
    renderCell(item) {
      return `${item.firstName} ${item.lastName}`;
    },
  },
];

export const BodyCallback: Story = {
  args: {
    columns: columnsWithCallback,
  },
};

function SampleCellComponent() {
  return <span className='text-blue'>Custom cell</span>;
}

const columnsWithCustomCells: ColumnInfo<SampleUser>[] = [
  ...columns,
  {
    columnName: 'Actions',
    cellComponent: SampleCellComponent,
    width: 'w-32',
  },
];

export const CustomCells: Story = {
  args: {
    columns: columnsWithCustomCells,
  },
};
