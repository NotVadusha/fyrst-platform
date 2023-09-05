import React from 'react';

import { RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/common/components/ui/common/Button';
import { cn } from 'src/common/helpers/helpers';

export function RefreshButton({ className }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <Button
      className={cn('flex self-end', className)}
      onClick={() => {
        navigate(0);
      }}
    >
      <RefreshCcw className='w-6 h-6' />
    </Button>
  );
}
