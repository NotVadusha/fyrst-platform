import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/common/components/ui/common/Accordion/Accordion';
import { useGetInvitationsQuery } from 'src/common/store/api/packages/invitation/invitationApi';
import { format } from 'date-fns';
import { cn } from 'src/common/helpers/helpers';

export default function InverviewPage() {
  const { data } = useGetInvitationsQuery('');

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='text-xl text-black'>
          Invitations to interview ({data?.length ?? 0})
        </AccordionTrigger>
        <AccordionContent className='border-b border-grey border-opacity-25	'>
          <div className='space-y-4'>
            {!!data?.length &&
              data?.map(invitation => (
                <div
                  className='flex flex-col gap-4 md:flex-row justify-between mr-6'
                  key={invitation.id}
                >
                  <div className='flex md:justify-initial justify-between gap-12 text-[1rem]'>
                    <span className='text-dark-grey'>{format(new Date(invitation.date), 'P')}</span>
                    <Link to={`/booking/interview/${invitation.id}`}>
                      <span className='text-blue font-medium'>
                        {invitation.booking.facility.name}
                      </span>
                    </Link>
                  </div>
                  <div className='flex md:justify-initial justify-between gap-12 text-md text-[1rem]'>
                    <span className='text-green-2'>Job in process</span>
                    <span className='text-black'>
                      <span className={cn({ 'text-red-2': invitation.status === 'declined' })}>
                        Interview{' '}
                        {invitation.status === 'pending' ? 'is pending' : invitation.status}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
