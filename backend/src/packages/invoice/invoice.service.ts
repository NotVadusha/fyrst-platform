import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { BookingService } from '../booking/booking.service';
import { FacilityService } from '../facility/facility.service';
import { TimecardService } from '../timecard/timecard.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_SERVICE') private invoiceService: ClientProxy,
    private userService: UserService,
    private bookingService: BookingService,
    private facilityService: FacilityService,
    private timecardService: TimecardService,
  ) {}

  async getHello() {
    return await firstValueFrom(this.invoiceService.send('get_hello', {}));
  }

  async getInvoice(timecardId: number) {
    const timecard = await this.timecardService.getById(timecardId);
    const user = await this.userService.findOne(timecard.createdBy);
    const booking = await this.bookingService.find(timecard.bookingId);
    const facility = await this.facilityService.findById(booking.facilityId);

    return await firstValueFrom(
      this.invoiceService.send('get_invoice_pdf_link', {
        timecard,
        user,
        booking,
        facility,
      }),
    );
  }
}
