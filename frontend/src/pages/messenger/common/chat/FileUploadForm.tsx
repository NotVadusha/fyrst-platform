import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useAppDispatch } from 'src/common/hooks/redux';
import { useUploadAttachmentMutation } from 'src/common/store/api/packages/chat/chatApi';
import { setAttachment } from 'src/common/store/slices/packages/messenger/messangerSlice';

export function FileUploadForm({ onUpload }: { onUpload: () => void }) {
  const [base64String, setBase64String] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const [uploadAttachment, result] = useUploadAttachmentMutation();

  const uploadFile = async () => {
    if (!base64String) return;

    await uploadAttachment({ attachment: base64String })
      .unwrap()
      .then(res => {
        toast({ title: 'Image successfully uploaded' });
        dispatch(setAttachment(res));
        onUpload();
      })
      .catch(err => err);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <label htmlFor='picture' className='text-xl text-dark'>
          Picture
        </label>
        <input
          id='picture'
          type='file'
          onChange={event => {
            if (!event.target.files?.[0]) return;
            const file = event.target.files?.[0];
            const reader = new FileReader();

            reader.onload = function (event) {
              const result = event.target?.result as string;
              const base64 = result.split(',')[1];
              setBase64String(base64);

              console.log(base64);
            };

            reader.readAsDataURL(file);
          }}
        />
      </div>
      <Button className='w-full' disabled={!base64String} onClick={() => uploadFile()}>
        Upload
      </Button>
    </div>
  );
}
