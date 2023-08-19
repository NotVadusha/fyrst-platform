import { userStub } from '../test/user.helpers';
export const UserService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(userStub()[0]),
  findAll: jest.fn().mockResolvedValue(userStub()),
  create: jest.fn().mockResolvedValue(userStub()[0]),
  update: jest.fn().mockResolvedValue(userStub()[0]),
  delete: jest.fn().mockResolvedValue(userStub()[0]),
});
