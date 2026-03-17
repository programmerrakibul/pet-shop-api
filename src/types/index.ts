import { Document } from "mongoose";

export interface TPet {
  name: string;
  species: string;
  breed: string;
  age: number;
  adopted: boolean;
  intakeDate: Date;
  adoptionDate?: Date;
  photo: string;
  medicalRecord: {
    vaccinations: string[];
    weightKg: number;
    microchipId: null | string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TPetDocument extends TPet, Document {}

export interface TUser {
  name?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  role: "user" | "admin";
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoggedIn: Date;
}

export interface TUserDocument extends TUser, Document {}
