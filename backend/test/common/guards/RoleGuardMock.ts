import { CanActivate } from '@nestjs/common';

export const RoleGuardMock: CanActivate = { canActivate: jest.fn(() => true) };
