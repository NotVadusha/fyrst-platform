import { Injectable } from '@nestjs/common';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import { StorageFile } from './types';

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

  async save(path: string, media: Buffer, metadata?: { [key: string]: string }[]) {
    const object = metadata?.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.on('finish', async () => {
      return await file.setMetadata({
        metadata: object || {},
      });
    });
    stream.end(media);
    return await this.getFileLink(path, 'read', Date.now() + 1000 * 60 * 60);
  }

  async delete(path: string) {
    await this.storage.bucket(this.bucket).file(path).delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
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
