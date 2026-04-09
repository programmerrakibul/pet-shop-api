import type { TPetDocument } from "@/types/index.js";
import { model, Schema } from "mongoose";

const petSchema = new Schema<TPetDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    adopted: {
      type: Boolean,
      default: false,
    },
    intakeDate: {
      type: Date,
      required: true,
    },
    adoptionDate: Date,
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    medicalRecord: {
      vaccinations: {
        type: [String],
        default: [],
      },
      weightKg: {
        type: Number,
        required: true,
      },
      microchipId: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Pet = model<TPetDocument>("Pet", petSchema);
