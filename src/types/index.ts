import { Document } from "mongoose";

export interface TAppError extends Error {
  statusCode: number;
}

export interface TPet extends Document {
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
