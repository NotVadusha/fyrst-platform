import React, { useCallback } from 'react';

interface Properties {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Properties> = ({ value, onChange }) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, []);

  return (
    <input
      type='text'
      className='p-4 rounded-2xl bg-field text-body-default w-full opacity-50'
      value={value}
      onChange={handleChange}
    />
  );
};

export { SearchInput };
