export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  position: string;
  salary: number;
}

export interface EmployeeViewModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  position: string;
  salary: number;
}

export interface EmployeeCreateViewModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  position: string;
  salary: number;
}
