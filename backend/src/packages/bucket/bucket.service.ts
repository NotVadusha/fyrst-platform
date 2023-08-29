import { Injectable } from '@nestjs/common';
import { DownloadResponse, Storage } from '@google-cloud/storage';

@Injectable()
export class BucketService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.BUCKET_PROJECT_ID,
      credentials: {
        client_email: process.env.BUCKET_CLIENT_EMAIL,
        private_key: process.env.BUCKET_PRIVATE_KEY,
      },
    });

    this.bucket = process.env.BUCKET_NAME;
  }

  async save(path: string, media: Buffer) {
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.end(media);
    return await this.getFileLink(path, 'read', Date.now() + 1000 * 60 * 60);
  }

  async delete(path: string) {
    await this.storage.bucket(this.bucket).file(path).delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<Buffer> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    return buffer;
  }

  async getFileLink(
    path: string,
    action: 'read' | 'delete' | 'write' | 'resumable',
    expires: number,
  ) {
    const [url] = await this.storage.bucket(this.bucket).file(path).getSignedUrl({
      action,
      expires,
    });
    return url;
  }
}
