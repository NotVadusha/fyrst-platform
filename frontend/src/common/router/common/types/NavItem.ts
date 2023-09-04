import { SVGIconProps } from 'src/common/types/interfaces/svg-icon.interface';

export type NavItem = {
  title: string;
  path: string;
  mainPath: string;
  icon?: React.FunctionComponent<SVGIconProps>;
  items?: NavItem[];
  isPrivate?: boolean;
  canAccess?: string[];
};
