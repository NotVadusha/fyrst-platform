import React, { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { createWorker } from 'tesseract.js';
import { parseInfo } from './ProfileEditForm';
const parse = require('mrz').parse;

export interface IdCardParserInputs {
  setData: (data: parseInfo) => void;
}

const truncateSpaces = (text: string) => {
  if (!text.includes(' ')) return text;
  const end = text.lastIndexOf(' ');
  const truncatedEnd = text.substring(0, end);
  const start = truncatedEnd.indexOf(' ');
  const truncatedBoth = truncatedEnd.substring(start + 1);
  const final = truncatedBoth.replaceAll(' ', '');
  return final ? final : ' ';
};

const IdCardParser = ({ setData }: IdCardParserInputs) => {
  const imageInput = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0] as File;

      if (newImage.size >= 15e6) {
        toast({
          title: 'Image size must be less than 15MB',
          description: 'Please, choose another image less than 15MB size',
          variant: 'destructive',
        });
        return;
      }
      const imageUrl = URL.createObjectURL(newImage);

      runOCR(imageUrl)
        .then(result => {
          const parsed = parse(result);

          const year = Number(parsed.fields.birthDate.substring(0, 2));
          const month = Number(parsed.fields.birthDate.substring(2, 4));
          const day = Number(parsed.fields.birthDate.substring(4));

          const birthDate = new Date(
            year >= new Date().getFullYear() - 2000 ? 1900 + year : 2000 + year,
            month - 1,
            day + 1,
          );

          const dataToSave: parseInfo = {
            birthDate,
            sex: parsed.fields.sex,
            documentNumber: parsed.fields.documentNumber.replaceAll('O', 0).replaceAll('B', 8),
          };

          setData(dataToSave);
          toast({
            title: 'Changes applied',
            description: 'MSR code scanned. Submit form to apply changes',
            variant: 'default',
          });
          if (imageInput.current) imageInput.current.value = '';
        })
        .catch(error => {
          toast({
            title: `Can't read information from image`,
            description: 'Please, upload more accurate image of you MSR code',
            variant: 'destructive',
          });
        });
    }
  };

  const handleUploadImage = () => {
    imageInput.current?.click();
  };

  const runOCR = async (imagePath: string) => {
    const worker = await createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: 'QWERTYUIOPASDFGHJLZXCKVBNM1234567809<',
    });

    const { data } = await worker.recognize(imagePath, {});
    await worker.terminate();

    const idLineIndex = data.lines.findIndex(value => value.text.includes('ID'));
    const msrFormat = [
      (data.lines[idLineIndex].text.replaceAll('\n', '') + '<<<<<<<<<<').slice(0, 30),
      (data.lines[idLineIndex + 1].text.replaceAll('\n', '') + '<<<<<<<<<<').slice(0, 30),
      (data.lines[idLineIndex + 2].text.replaceAll('\n', '') + '<<<<<<<<<<').slice(0, 30),
    ];
    // ?.paragraph.lines.map(line =>
    //   (line.text.replaceAll('\n', '') + '<<<<<<<').slice(0, 30),
    // );

    return msrFormat;
  };

  return (
    <>
      <input
        accept='image/*'
        hidden
        id='id-card-parse'
        type='file'
        onChange={handleImageChange}
        ref={imageInput}
      />
      <Button variant='secondary' className='w-full my-4' onClick={handleUploadImage}>
        Upload MSR photo
      </Button>
    </>
  );
};

export default IdCardParser;
