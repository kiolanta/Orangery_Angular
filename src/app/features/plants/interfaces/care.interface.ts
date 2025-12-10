export interface Care {
  id: number;
  type: string;
  date: string; // ISO string (наприклад, '2025-12-10')
  plantId: number;
  employeeId: number;
}
