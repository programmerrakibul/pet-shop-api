import z from "zod";

export const userSchemaZ = z.object(
  {
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long!")
      .max(50, "Name must be at most 50 characters long!")
      .optional(),
    email: z.email("Email must be a valid email!").lowercase(),
    password: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? "Password is required!"
            : "Invalid Password type!",
      })
      .trim()
      .min(8, "Password must be at least 8 characters long!")
      .max(20, "Password must be at most 20 characters long!"),
    phoneNumber: z.coerce.number().optional(),
    address: z.string("Address must be a valid string!").optional(),
    role: z
      .enum(["user", "admin"], "Role must be either user or admin!")
      .default("user"),
  },
  "User valid data is required in the request body!",
);
