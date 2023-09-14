import React, { ChangeEvent, useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useAppDispatch } from 'src/common/hooks/redux';
import { useUploadAttachmentMutation } from 'src/common/store/api/packages/chat/chatApi';
import {
  setAttachmentPath,
  setAttachmentFileUrl,
} from 'src/common/store/slices/packages/messenger/messangerSlice';

const MAX_IMAGE_SIZE = 2e6;

export function FileUploadForm({ onUpload }: { onUpload: () => void }) {
  const [base64String, setBase64String] = useState<string | undefined>('');
  const [file, setFile] = useState<File | undefined>();

  const dispatch = useAppDispatch();

  const [uploadAttachment, result] = useUploadAttachmentMutation();

  const uploadFile = async () => {
    if (!base64String) return;

    await uploadAttachment({ attachment: base64String })
      .unwrap()
      .then(res => {
        toast({ title: 'Image successfully uploaded' });
        dispatch(setAttachmentPath(res));
        if (file) dispatch(setAttachmentFileUrl(URL.createObjectURL(file)));
        onUpload();
      })
      .catch(err => err);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;

    const file = event.target.files?.[0];

    if (file.size >= MAX_IMAGE_SIZE) {
      toast({
        title: 'Image is too large.',
        description: 'Please, choose another image less than 2MB size',
        variant: 'destructive',
      });
      return;
    }

    setFile(event.target?.files?.[0]);

    const reader = new FileReader();

    reader.onload = function (event) {
      const result = event.target?.result as string;
      const base64 = result.split(',')[1];
      setBase64String(base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <label htmlFor='picture' className='text-xl text-dark'>
          Picture
        </label>
        <input accept='image/*' id='picture' type='file' onChange={handleImageChange} />
      </div>
      <Button className='w-full' disabled={!base64String} onClick={() => uploadFile()}>
        Upload
      </Button>
    </div>
  );
}
