import React from 'react';

import { RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/common/components/ui/common/Button';

export function RefreshButton() {
  const navigate = useNavigate();

  return (
    <Button
      className='flex self-end'
      onClick={() => {
        navigate(0);
      }}
    >
      <RefreshCcw className='w-6 h-6' />
    </Button>
  );
}
