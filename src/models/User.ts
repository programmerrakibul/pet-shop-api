import { model, Schema } from "mongoose";
import { TUser } from "../types/index.js";
import { config } from "../config/config.js";
import bcrypt from "bcryptjs";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required!"],
      minLength: [3, "Name must be at least 3 characters long!"],
      maxLength: [50, "Name must be at most 50 characters long!"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      select: false,
      minLength: [8, "Password must be at least 8 characters long!"],
      maxLength: [20, "Password must be at most 20 characters long!"],
    },
    phoneNumber: Number,
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE is not a valid role! Role must be user or admin!}",
      },
      trim: true,
      lowercase: true,
      default: "user",
    },
    verified: {
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

userSchema.pre<TUser>("save", async function (this: TUser): Promise<void> {
  const today = new Date();

  if (this.isNew) {
    this.lastLoggedIn = today;
  }

  if (this.isModified("password")) {
    const round = Number(config.SALT_ROUND) || 10;
    this.password = await bcrypt.hash(this.password as string, round);
  }

  this.updatedAt = today;
});

export const User = model<TUser>("User", userSchema);
