import { model, Schema } from "mongoose";
import type { TPet } from "../types/index.js";

const petSchema = new Schema<TPet>(
  {
    name: {
      type: String,
      required: [true, "Pet Name is required!"],
      trim: true,
      minLength: [3, "Pet Name must be at least 3 characters long!"],
      maxLength: [50, "Pet Name must be at most 50 characters long!"],
    },
    species: {
      type: String,
      required: [true, "Pet Species is required!"],
      trim: true,
      minLength: [2, "Pet Species must be at least 2 characters long!"],
      maxLength: [20, "Pet Species must be at most 20 characters long!"],
    },
    breed: {
      type: String,
      required: [true, "Pet Breed is required!"],
      trim: true,
      minLength: [3, "Pet Breed must be at least 3 characters long!"],
      maxLength: [20, "Pet Breed must be at most 20 characters long!"],
    },
    age: {
      type: Number,
      required: [true, "Pet Age is required!"],
      trim: true,
      min: [1, "Pet Age must be at least 1 year old!"],
      max: [7, "Pet Age must be at most 7 years old!"],
    },
    adopted: {
      type: Boolean,
      required: [true, "Pet Adoption Status is required!"],
      default: false,
      trim: true,
      lowercase: true,
    },
    intakeDate: {
      type: Date,
      required: [true, "Pet Intake Date is required!"],
    },
    adoptionDate: {
      type: Date,
    },
    photo: {
      type: String,
      required: [true, "Pet Photo is required!"],
      trim: true,
    },
    medicalRecord: {
      vaccinations: [
        {
          type: String,
          trim: true,
        },
      ],
      weightKg: {
        type: Number,
        required: [true, "Pet Weight is required!"],
        min: [1, "Pet Weight must be at least 1 KG!"],
        max: [7, "Pet Weight must be at most 7 KG!"],
      },
      microchipId: {
        type: String,
        default: null,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

petSchema.pre<TPet>("save", function (): void {
  this.updatedAt = new Date();
});

export const Pet = model<TPet>("Pet", petSchema);
