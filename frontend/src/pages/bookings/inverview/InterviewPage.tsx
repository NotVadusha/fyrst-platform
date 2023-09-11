import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/common/components/ui/common/Accordion/Accordion';

export default function InverviewPage() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='text-xl text-black'>
          Invitations to interview (1)
        </AccordionTrigger>
        <AccordionContent className='border-b border-grey border-opacity-25	'>
          <div className='flex justify-between mr-6'>
            <div className='flex gap-6 text-[1rem]'>
              <span className='text-dark-grey'>06/09/2023</span>
              <Link to='/booking/1'>
                <span className='text-blue font-medium'>Nurse</span>
              </Link>
            </div>
            <div className='flex gap-12 text-md text-[1rem]'>
              <span className='text-green-2'>Job in process</span>
              <span className='text-black'>Interview accepted</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
