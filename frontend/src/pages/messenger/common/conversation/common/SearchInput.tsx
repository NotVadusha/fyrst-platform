import React, { useCallback } from 'react';
import { HardDrive, Search, X } from 'lucide-react';
import { cn } from 'src/common/helpers/helpers';
import { Button } from 'src/common/components/ui/common/Button';

interface Properties extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Properties> = ({ value, onChange, className, ...props }) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, []);

  return (
    <div className={cn('relative', className)}>
      <input
        type='text'
        className={
          'p-4 pl-12 rounded-2xl peer  bg-field text-body-default w-full outline-none focus:outline-blue  placeholder:text-grey text-black'
        }
        value={value}
        onChange={handleChange}
        {...props}
      />
      <Search className='absolute top-4 left-4 w-6 h-6 text-grey peer-focus:text-blue' />
      <Button
        variant={'tertiary'}
        className={cn('w-fit h-fit p-0 absolute top-4 right-4', { hidden: !value })}
        onClick={() => onChange('')}
      >
        <X className='w-6 h-6 text-blue peer-focus:visible' />
      </Button>
    </div>
  );
};

export { SearchInput };
