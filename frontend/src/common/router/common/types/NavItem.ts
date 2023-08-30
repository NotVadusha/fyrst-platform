import { SVGIconProps } from 'src/common/types';

export interface NavItem {
  title: string;
  path: string;
  mainPath: string;
  icon?: React.FunctionComponent<SVGIconProps>;
  items?: NavItem[];
}
