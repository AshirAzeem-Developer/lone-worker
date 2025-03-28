export interface ShiftData {
  id: number;
  customer_name: string;
  site_name: string;
  days: string[]; // after parsing, it's always an array
  start_time: string;
  end_time: string;
}
