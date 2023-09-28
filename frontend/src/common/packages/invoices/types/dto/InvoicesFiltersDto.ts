export interface InvoicesFiltersDto {
  minDate?: string | null;
  maxDate?: string | null;
  payee?: string | null;
  limit?: string | null;
  offset?: string | null;
}
