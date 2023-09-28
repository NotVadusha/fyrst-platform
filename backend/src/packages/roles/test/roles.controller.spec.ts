import { Test } from '@nestjs/testing';
import { rolesMock, existingId, TestRole, updateInfo } from './roles.helpers';
import { RoleDto } from '../dto/role.dto';
import { RolesController } from '../roles.controller';
import { RolesService } from '../roles.service';

describe('RolesContoller', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;
  const defaultRoles = rolesMock();

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: RolesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((role: RoleDto) => Promise.resolve({ id: '1', ...role })),
            findAll: jest.fn().mockResolvedValue(defaultRoles),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ ...defaultRoles[0], id })),
            update: jest
              .fn()
              .mockResolvedValue((id: number, updateRoleInfo: TestRole) =>
                Promise.resolve(updateRoleInfo),
              ),
            delete: jest.fn().mockResolvedValue((id: number) => Promise.resolve(true)),
          },
        },
      ],
      controllers: [RolesController],
    }).compile();

    rolesController = moduleRef.get<RolesController>(RolesController);
    rolesService = moduleRef.get<RolesService>(RolesService);
  });

  describe('getRole', () => {
    describe('when getRole is called', () => {
      let role: TestRole;
      const expected = defaultRoles[0];

      beforeEach(async () => {
        role = await rolesController.getOne(existingId);
      });

      test('It should return a role', () => {
        expect(role).toEqual(expected);
      });
    });
  });

  describe('getRoles', () => {
    describe('when getRoles is called', () => {
      let roles: TestRole[];

      beforeEach(async () => {
        roles = await rolesController.getAll();
      });

      test('It should return roles', () => {
        expect(roles).toEqual(defaultRoles);
      });
    });
  });

  describe('createRole', () => {
    describe('when createRole is called', () => {
      let role: TestRole;
      const createRoleDto: RoleDto = rolesMock()[0];

      beforeEach(async () => {
        role = await rolesController.create(createRoleDto);
      });

      test('then it should return a role', () => {
        expect(role).toEqual(createRoleDto);
      });
    });
  });

  describe('updateRole', () => {
    describe('when updateRole is called', () => {
      let role: TestRole;
      const updatedrole: TestRole = rolesMock()[0];

      beforeEach(async () => {
        role = await rolesController.update(existingId, updateInfo);
      });

      test('then it should return a role', () => {
        expect(role).toEqual(updatedrole);
      });
    });
  });

  describe('deleteRole', () => {
    describe('When deleteRole called', () => {
      let role: boolean;

      beforeEach(async () => {
        role = await rolesController.delete(existingId);
      });

      test('then it should return a "true"', () => {
        expect(role).toEqual(true);
      });
    });
  });
});
