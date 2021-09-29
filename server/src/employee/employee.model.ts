//! Not belong here, temp
export interface Constrain {
  id: number;
}

export interface BankAccount {
  bank: number;
  branch: number;
  account: number;
}

export interface Dob {
  date: Date;
  age: number;
}

export interface Phone {
  prefix: number;
  number: number;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  house: number | string;
  apartment: number;
}

export interface Name {
  first: string;
  last: string;
}

export interface Employee {
  id: string;
  name: Name;
  social_id: number;
  picture: string;
  address: Address;
  phone: Phone;
  dob: Dob;
  bank_account: BankAccount;
  attached_files?: string[];
  //Ids of workplaces
  managing_places?: string[];
  assigned_workplaces?: string[];
  //Ids of shifts
  completed_shifts?: string[];
  assigned_shifts?: string[];
  constrains: Constrain[];
  current_location: GeolocationPosition
}
