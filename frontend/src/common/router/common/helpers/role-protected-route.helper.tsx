import React from 'react';
import { useAppSelector } from 'src/common/hooks/redux';
import { userRoles } from 'shared/packages/roles/userRoles';
import { Navigate } from 'react-router-dom';
import { hasRole } from 'src/common/helpers/authorization/hasRole';
import { User } from 'src/common/packages/user/types/models/User.model';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

export type RoleProtectedRouteProps = {
  children: JSX.Element;
  role: keyof typeof userRoles;
};

export const RoleProtectedRoute = ({ children, role }: RoleProtectedRouteProps) => {
  const user = useAppSelector(state => state.user);

  if (!user.role) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!hasRole(role, user as User)) {
    return <Navigate to={'/booking'} replace />;
  }

  return children;
};
