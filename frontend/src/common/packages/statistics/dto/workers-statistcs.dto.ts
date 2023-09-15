export interface WorkersStatistcsDto {
  facilityId: string;
  startDate: string;
}

export interface WorkersStatistcsResponseDto {
  averageWorkers: number;
  totalWorkers: number;
  averagePayment: number;
}
