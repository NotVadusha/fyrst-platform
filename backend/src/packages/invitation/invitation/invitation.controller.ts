import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { AccessTokenGuard } from 'src/packages/auth/guards/access-token.guard';
@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Request() req, @Body() createInvitationDto: CreateInvitationDto) {
    Logger.log('invitation', createInvitationDto, req.user['id']);
    return this.invitationService.create(createInvitationDto, req.user['id']);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllByUserId(@Request() req) {
    return this.invitationService.findAll(req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return this.invitationService.update(+id, updateInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationService.remove(+id);
  }
}
