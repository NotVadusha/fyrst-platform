import React from 'react';
import { Card, CardContent, CardTitle } from 'src/common/components/ui/common/Card/Card';
import { Timecard } from 'src/common/packages/timecard/types/models/Timecard.model';
import defaultAvatar from 'src/assets/icons/default-profile-avatar.svg';
import { useGetUserProfileQuery } from 'src/common/store/api/packages/user/userApi';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { toast } from 'src/common/components/ui/common/Toast/useToast';

type AdditionalInfoInputProps = {
  timecard: Timecard;
};

export const AdditionalTimeCardInfo = ({ timecard }: AdditionalInfoInputProps) => {
  let facilityManagerProfile;
  if (timecard.facilityManager)
    facilityManagerProfile = useGetUserProfileQuery({
      id: timecard.facilityManager.id,
    });

  let employeeProfile;
  if (timecard.employee) {
    employeeProfile = useGetUserProfileQuery({
      id: timecard.employee.id,
    });
    if (employeeProfile.isError) {
      console.log(employeeProfile.error);
    }
  }

  const facilityManagerFullName = timecard.facilityManager
    ? `${timecard.facilityManager.first_name} ${timecard.facilityManager.last_name}`
    : 'Not yet approved';

  const facilityManagerField =
    facilityManagerFullName.length > 17
      ? facilityManagerFullName.substring(0, 12) + '...'
      : facilityManagerFullName;

  const employeeFullName = `${timecard.employee.first_name} ${timecard.employee.last_name}`;

  const facilityManagerAvatar = facilityManagerProfile
    ? facilityManagerProfile.data?.avatar
    : defaultAvatar;
  const employeeAvatar = defaultAvatar;

  return (
    <Card className='col-span-3'>
      <CardTitle>Additional details</CardTitle>
      <CardContent className='flex flex-col space-y-4 items-start text-dark-grey'>
        <div className='flex justify-between gap-2 w-full'>
          <span>Employee</span>
          <span>
            <img className='h-6 w-6 mx-2 inline-block rounded-full' src={employeeAvatar} />
            {employeeFullName.length > 17
              ? employeeFullName.substring(0, 12) + '...'
              : employeeFullName}
          </span>
        </div>

        <div className='flex justify-between gap-2 w-full'>
          <span>Facility manager</span>
          <span>
            {timecard.approvedBy && (
              <img className='h-6 w-6 mx-2 inline-block rounded-full' src={facilityManagerAvatar} />
            )}
            {facilityManagerField}
          </span>
        </div>

        <div className='flex justify-between gap-2 w-full'>
          <span>Facility</span>
          <span>
            {timecard.booking.facility.name.length > 17
              ? timecard.booking.facility.name.substring(0, 12) + '...'
              : timecard.booking.facility.name}
          </span>
        </div>

        <div className='flex justify-between gap-2 w-full'>
          <span>Hours worked</span>
          <span>{`${timecard.hoursWorked} hours`}</span>
        </div>

        <div className='flex justify-between gap-2 w-full'>
          <span>Lunch hours</span>
          <span>{`${timecard.lunchHours} hours`}</span>
        </div>
      </CardContent>
    </Card>
  );
};
