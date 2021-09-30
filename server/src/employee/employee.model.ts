import * as mongoose from "mongoose";

export const employeeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  social_id: { type: Number, required: true },
  picture: { type: String, required: true },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    apartment: { type: Number, required: true },
  },
  phone: {
    prefix: { type: Number, required: true },
    number: { type: Number, required: true },
  },
  dob: {
    date: { type: Date, required: true },
    age: { type: Number, required: false },
  },
  bank_account: {
    bank: { type: Number, required: false },
    branch: { type: Number, required: false },
    account: { type: Number, required: false },
  },
  managing_places: [{ type: String, required: false }],
  assigned_workplaces: [{ type: String, required: false }],
  //Ids of shifts
  completed_shifts: [{ type: String, required: false }],
  assigned_shifts: [{ type: String, required: false }],
  constrains: [{ type: String, required: false }],
  current_location: { type: Geolocation, required: false },
});

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
  constrains?: Constrain[];
  current_location?: Geolocation;
}
