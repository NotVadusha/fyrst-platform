export interface BookingFiltersDto {
  endDate?: string | null;
  startDate?: string | null;
  status?: string | null;
  facilityId?: string | null;
  limit?: number | null;
  offset?: number | null;
}
