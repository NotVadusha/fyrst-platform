import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';

@Injectable()
export class GotenbergClientService {
  private readonly scale = 1.0;

  async createPdfFromHtml(html: string): Promise<any> {
    const formData = new FormData();
    formData.append('files', Buffer.from(html), { filename: 'index.html' });
    formData.append('scale', this.scale);

    const response = await axios.post('forms/chromium/convert/html', formData, {
      baseURL: process.env.GOTENBERG_URL,
      responseType: 'stream',
    });

    return response.data;
  }
}
