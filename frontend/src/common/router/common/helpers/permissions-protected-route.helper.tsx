import React from 'react';
import { Permissions } from 'src/common/packages/permissions/types/Permissions';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/common/hooks/redux';
import { hasPermissions } from 'src/common/helpers/authorization/hasPermissions';
import { User } from 'src/common/packages/user/types/models/User.model';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

export type PermissionsProtectedRouteProps = {
  children: JSX.Element;
  permissions: (keyof Omit<Permissions, 'userId'>)[];
};

export const PermissionsProtectedRoute = ({
  children,
  permissions,
}: PermissionsProtectedRouteProps) => {
  const user = useAppSelector(state => state.user);

  if (!user.permissions) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!hasPermissions(permissions, user as User)) {
    return <Navigate to={'/booking'} replace />;
  }

  return children;
};
