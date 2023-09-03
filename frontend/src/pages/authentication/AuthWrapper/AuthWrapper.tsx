import React from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
  image: string;
  text?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, image, text }) => {
  return (
    <div className='h-screen w-screen flex flex-row'>
      <section className='flex items-center justify-center w-full md:w-1/2 bg-white'>
        {children}
      </section>
      <section className='items-center justify-center w-1/2 bg-blue hidden md:flex'>
        <div className='flex flex-col gap-10 w-3/4'>
          <img className='w-full' src={image} alt='auth image' />
          {text ? (
            <h3 className='text-3xl leading-[2.8125rem] text-white text-center'>{text}</h3>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default AuthWrapper;
