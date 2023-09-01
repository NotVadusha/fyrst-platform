import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { UserDefaultResponse } from 'src/common/packages/user/types/dto/UserDto';

export function FileUploadForm() {
  const [file, setFile] = useState<UserDefaultResponse>();

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <label htmlFor='picture' className='text-xl text-dark'>
          Picture
        </label>
        <input id='picture' type='file' />
      </div>
      <Button className='w-full' disabled={!file}>
        Upload
      </Button>
    </div>
  );
}
