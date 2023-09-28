import { Readable } from 'stream';

export const streamToBase64 = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const base64String = buffer.toString('base64');
      resolve(base64String);
    });

    stream.on('error', error => {
      reject(error);
    });
  });
};
