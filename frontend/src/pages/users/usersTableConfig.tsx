import React from 'react';

import { ColumnInfo } from 'src/ui/common/Table/Table';
import { User } from 'types';
import { UserActions } from './actions/UserActions';

export const columns: ColumnInfo<User>[] = [
  {
    columnName: 'Name',
    renderCell: cell => `${cell.first_name} ${cell.last_name}`,
  },
  {
    columnName: 'Email',
    renderCell: ({ email }) => email,
  },
  {
    columnName: 'Phone',
    renderCell: ({ phone_number }) => phone_number ?? '',
  },
  {
    columnName: 'City',
    renderCell: ({ city }) => city,
  },
  {
    columnName: 'Email confirmed',
    renderCell: ({ is_confirmed }) => String(is_confirmed),
  },
  {
    columnName: 'Birthdate',
    renderCell: ({ birthdate }) => birthdate,
  },
  {
    columnName: 'Actions',
    renderCell: cell => <UserActions user={cell} />,
  },
];
