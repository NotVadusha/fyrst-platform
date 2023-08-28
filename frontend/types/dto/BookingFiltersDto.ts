export interface BookingFiltersDto {
  endDate?: string | null;
  startDate?: string | null;
  status?: string | null;
  facility?: number | null;
  limit?: number | null;
  offset?: number | null;
}
