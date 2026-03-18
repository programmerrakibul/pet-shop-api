import { model, Schema } from "mongoose";
import { config } from "../config/config.js";
import bcrypt from "bcryptjs";

import type { TUserDocument } from "../types/index.js";

const userSchema = new Schema<TUserDocument>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: Number,
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      trim: true,
      lowercase: true,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLoggedIn: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<TUserDocument>(
  "save",
  async function (this: TUserDocument): Promise<void> {
    if (!this.isNew) {
      this.lastLoggedIn = new Date();
    }

    if (this.isModified("password")) {
      const round = Number(config.SALT_ROUND) || 10;
      this.password = await bcrypt.hash(this.password as string, round);
    }
  },
);

export const User = model<TUserDocument>("User", userSchema);
