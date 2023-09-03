import React from 'react';
import { Permissions } from 'src/common/packages/permissions/types/Permissions';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/common/hooks/redux';

export type PermissionsProtectedRouteProps = {
  children: JSX.Element;
  permissions: (keyof Omit<Permissions, 'userId'>)[];
};

export const PermissionsProtectedRoute = ({
  children,
  permissions,
}: PermissionsProtectedRouteProps) => {
  const user = useAppSelector(state => state.user);

  if (
    !user.permissions ||
    !permissions.every(key => {
      return user.permissions && user.permissions[key];
    })
  ) {
    return <Navigate to={'/booking'} replace />;
  }

  return children;
};
