import { config } from "@/config/config.js";
import type { TUserDocument } from "@/types/index.js";
import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

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
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
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
    versionKey: false,
    collection: "User",
    id: true,
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
      this.password = await bcrypt.hash(this.password, round);
    }
  },
);

export const User = model<TUserDocument>("User", userSchema);
