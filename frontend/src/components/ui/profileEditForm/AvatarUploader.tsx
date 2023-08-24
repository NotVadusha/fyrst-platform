import React from 'react';
import AvatarEditor from 'react-avatar-editor';

interface InputProps {
  image: string;
  width: number;
  height: number;
  border: number;
  isShown: boolean;
  setShown: (state: boolean) => void;
}

export const AvatarUploader = ({ image, width, height, border, isShown, setShown }: InputProps) => {
  if (!isShown) return <></>;
  return (
    <div
      className='absolute w-screen h-screen bg-grey/50 left-0 top-0'
      onClick={() => setShown(false)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className='relative w-fit mx-auto my-auto'
      >
        <AvatarEditor image={image} width={width} height={height} border={border} />
      </div>
    </div>
  );
};
