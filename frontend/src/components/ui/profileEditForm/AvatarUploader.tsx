import React, { ChangeEvent, MutableRefObject, useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import ReactSlider from 'react-slider';

interface InputProps {
  width: number;
  height: number;
  border: number;
  isShown: boolean;
  setShown: (state: boolean) => void;
  savedImage: string;
  setImage: (imageUrl: string) => void;
}

export const AvatarUploader = ({
  width,
  height,
  border,
  isShown,
  setShown,
  savedImage,
  setImage,
}: InputProps) => {
  const [tempImage, setTempImage] = useState(savedImage);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setTempImage(newImage);
    }
  };
  const imageInput = useRef(null);
  const [rangeValue, setRangeValue] = useState(10);

  const onClose = () => {
    imageInput.current = null;
    setShown(false);
  };

  const handleUploadImage = () => {
    document.getElementById('avatar-image-upload')?.click();
  };

  const onRefChange = useCallback(
    //Fix img handling
    node => {
      if (node !== null) {
        setImage(savedImage);
      }
    },
    [savedImage],
  );

  const handleSave = async () => {
    if (imageInput.current) {
      const dataUrl = imageInput.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setImage(URL.createObjectURL(blob));
      setShown(false);
    }
  };

  if (!isShown) return <></>;
  return (
    <div
      className='absolute w-full h-max py-8
       bg-grey/50 left-0 top-0'
      onClick={() => setShown(false)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className='relative w-fit ml-80 mt-6 px-20 py-10 bg-black'
      >
        <h5 className='text-white font-semibold text-2xl mb-8'>Replace profile picture</h5>
        <input
          accept='image/*'
          hidden
          id='avatar-image-upload'
          type='file'
          onChange={handleImageChange}
        />
        <AvatarEditor
          ref={imageInput}
          image={tempImage}
          width={width}
          height={height}
          border={border}
          borderRadius={500}
          color={[0, 0, 0, 0.72]}
          scale={rangeValue / 10}
        />
        <div className='px-10'>
          <ReactSlider
            className='mt-6'
            marks
            min={1}
            max={50}
            defaultValue={rangeValue}
            onChange={value => setRangeValue(value)}
            renderThumb={(props, state) => (
              <div
                {...props}
                style={{ ...props.style, zIndex: 20 }}
                className='relative flex flex-col items-center w-6 h-6 -mt-2.5 outline-none'
              >
                <div className='w-6 h-6 bg-blue rounded-full cursor-pointer' />
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`h-1 rounded-full cursor-pointer ${
                  state.index ? 'bg-dark-grey' : 'bg-dark-blue'
                }`}
              />
            )}
          />
        </div>
        <div className='pt-6 w-fit ml-auto'>
          <button className='text-white py-2 px-2 rounded-md' onClick={onClose}>
            Cancel
          </button>
          <button className='text-white py-2 px-2 mx-6 rounded-md' onClick={handleUploadImage}>
            Upload image
          </button>
          <button
            className='text-white py-2 px-14 rounded-md bg-blue'
            onClick={() => {
              handleSave();
              setImage(tempImage);
              setShown(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
