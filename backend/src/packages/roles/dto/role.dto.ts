import { IsIn, IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsIn(['WORKER', 'FACILITY_ADMIN', 'AGENCY_ADMIN', 'SUPER_ADMIN'])
  @IsNotEmpty()
  label: string;
}
