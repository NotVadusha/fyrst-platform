import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'src/common/components/ui/common/Button';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import {
  useGetInvitationQuery,
  useUpdateInvitationMutation,
} from 'src/common/store/api/packages/invitation/invitationApi';
import styles from '../../BookingOverview/BookingOverview.module.css';
import BookingDescription from '../../BookingOverview/BookingDescription';
import AdditionalDetails from '../../BookingOverview/AdditionalDetails';
import StatusCard from '../../BookingOverview/StatusCard';
import { useFormattedDate } from 'src/common/hooks/use-formatted-date/useFormattedDate.hook';
import { format } from 'date-fns';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { cn } from 'src/common/helpers/helpers';

export default function InvitationPage() {
  const { id } = useParams();

  if (!id) return <></>;

  const { data, refetch } = useGetInvitationQuery(id);

  const [updateInvitation] = useUpdateInvitationMutation();

  const createdAt = useFormattedDate({
    dateString: String(data?.booking?.createdAt),
    format: 'dash',
  });
  const startDate = useFormattedDate({
    dateString: String(data?.booking?.startDate),
    format: 'dot',
  });
  const endDate = useFormattedDate({ dateString: String(data?.booking?.endDate), format: 'dot' });

  const handleInvitationUpdate = (status: 'accepted' | 'declined') => {
    updateInvitation({ id, status })
      .unwrap()
      .then(res => {
        refetch();
        toast({ title: `Invitation ${status}` });
      })
      .catch(err => err);
  };

  return (
    <>
      <Header title='Bookings' />
      <div className='container max-w-[1080px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10 space-y-8'>
        <GoBackButton path='/booking/interview'>Inverviews</GoBackButton>
        <div className='w-full flex bg-white justify-between p-4 rounded-md gap-4 flex-col sm:flex-row '>
          {data?.status !== 'declined' ? (
            <>
              <div className='w-full lg:w-[60%] flex flex-col gap-4'>
                {data?.status === 'accepted' && (
                  <h2 className='text-xl text-blue'>
                    Congrats! You have accepted the interview invitation.
                  </h2>
                )}
                <h2 className='text-black font-semibold'>When</h2>
                <p className='text-black'>
                  {data?.date && format(new Date(data.date), 'PPPP')} ⋅ {data?.time}
                </p>
                <h2 className='text-black font-semibold'>Attendees</h2>
                <p className='text-black'>{data?.organizer && data.organizer.email} - organizer</p>
              </div>
              <div className='flex gap-2'>
                <Button variant={'secondary'} onClick={() => handleInvitationUpdate('declined')}>
                  Decline
                </Button>
                {data?.status !== 'accepted' && (
                  <Button onClick={() => handleInvitationUpdate('accepted')}>Accept</Button>
                )}
              </div>
            </>
          ) : (
            <p className='text-xl text-blue'>You have declined the job interview. </p>
          )}
        </div>
        {data && (
          <div className={cn(styles.bookingBody, 'justify-between')}>
            <BookingDescription description={data.booking.notes} />
            <div className={styles.detailsAndStatusContainer}>
              <AdditionalDetails
                data={{
                  employer: data.booking.employersName,
                  createdAt,
                  startDate,
                  endDate,
                  payment: data.booking.pricePerHour,
                  sex: data.booking.sex,
                  age: data.booking.age,
                  languages: data.booking.languages ? data.booking.languages.join(', ') : '',
                }}
              />
              <StatusCard applicantsCount={data.booking.users.length ?? 0} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
