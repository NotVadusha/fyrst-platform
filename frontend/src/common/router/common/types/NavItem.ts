import { SVGIconProps } from 'src/common/types/interfaces/svg-icon.interface';
import { Permissions } from 'src/common/packages/permissions/types/Permissions';

export type NavItem = {
  title: string;
  path: string;
  mainPath: string;
  icon?: React.FunctionComponent<SVGIconProps>;
  items?: NavItem[];
  isPrivate?: boolean;
  neededPermission?: keyof Omit<Permissions, 'userId'>;
};
