import { Injectable } from '@nestjs/common';
import { ConvertService } from './packages/convert/convert.service';

@Injectable()
export class AppService {
  constructor(private convertService: ConvertService) {}

  getHello(): any {
    this.convertService.toPdfInvoice({text: 'hello'});
    return {
      message: 'Hello World!',
    };
  }
}
