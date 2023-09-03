import React from 'react';
import { useAppSelector } from 'src/common/hooks/redux';
import { userRoles } from 'shared/packages/roles/userRoles';
import { Navigate } from 'react-router-dom';

export type RoleProtectedRouteProps = {
  children: JSX.Element;
  role: keyof typeof userRoles;
};

export const RoleProtectedRoute = ({ children, role }: RoleProtectedRouteProps) => {
  const user = useAppSelector(state => state.user);

  if (!user.role || userRoles[user.role.label as keyof typeof userRoles] > userRoles[role]) {
    return <Navigate to={'/booking'} replace />;
  }

  return children;
};
