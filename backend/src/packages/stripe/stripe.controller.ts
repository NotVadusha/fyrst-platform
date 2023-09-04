import {
  Body,
  Controller,
  Post,
  Request,
  RawBodyRequest,
  Get,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { Response } from 'express';
import { CreateIntentsDto } from './dto/create-intents.dto';

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private userProfileService: UserProfileService,
  ) {}

  @Post('/intents')
  async initialize(@Body() createIntentsDto: CreateIntentsDto) {
    return this.stripeService.initializeIntents(createIntentsDto.paymentId);
  }

  @Post('/webhook')
  async webhook(@Request() req: RawBodyRequest<Request>) {
    return this.stripeService.webhook(req);
  }

  @Get(':userId/stripe-link')
  async connectStripe(@Param('userId', ParseIntPipe) userId: number) {
    const link = await this.stripeService.getStripeAccountLink(userId);
    return {
      link: link.url,
    };
  }

  @Get('confirm/:userId/:accountId')
  async updateStripeAccountInProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('accountId') accountId: string,
    @Res() res: Response,
  ) {
    await this.userProfileService.update(
      {
        stripeAccountId: accountId,
      },
      userId,
    );
    return res.redirect(`${process.env.CLIENT_URL}/payments`);
  }
}
