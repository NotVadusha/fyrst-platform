export interface PaymentsFiltersDto {
  minDate?: string | null;
  maxDate?: string | null;
  worker?: string | null;
  limit?: string | null;
  offset?: string | null;
}
