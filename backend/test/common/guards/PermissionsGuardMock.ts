import { CanActivate } from '@nestjs/common';

export const PermissionsGuardMock: CanActivate = { canActivate: jest.fn(() => true) };
