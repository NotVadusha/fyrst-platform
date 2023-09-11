import { Test, TestingModule } from '@nestjs/testing';
import { InvitationController } from '../../src/packages/invitation/invitation/invitation.controller';
import { InvitationService } from '../../src/packages/invitation/invitation/invitation.service';

describe('InvitationController', () => {
  let controller: InvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitationController],
      providers: [InvitationService],
    }).compile();

    controller = module.get<InvitationController>(InvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
