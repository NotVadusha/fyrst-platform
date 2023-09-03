import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';

export function FileUploadForm() {
  const [file, setFile] = useState<File>();

  const uploadFile = async () => {
    if (!file) return;

    let base64;

    const messageImage = URL.createObjectURL(file);

    if (!!messageImage && messageImage.includes('blob:')) {
      const blob = await (await fetch(messageImage)).blob();
      const arrayBuffer = await blob.arrayBuffer();
      base64 = Buffer.from(arrayBuffer).toString('base64');

      console.log(base64);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <label htmlFor='picture' className='text-xl text-dark'>
          Picture
        </label>
        <input id='picture' type='file' />
      </div>
      <Button className='w-full' disabled={!file} onClick={() => uploadFile()}>
        Upload
      </Button>
    </div>
  );
}
