export interface BookingAmountStatisticsDto {
  facilityId: string;
  startDate: string;
}

export interface BookingAmountStatisticsResponseDto {
  total: number;
  completed: number;
  pending: number;
}
