export default interface ITimesheet {
  id?: number;
  start_time: string;
  end_time: string;
  employee_id: number;
  full_name?: string;
}
