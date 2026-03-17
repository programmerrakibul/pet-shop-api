import z from "zod";

export const petSchemaZ = z.object(
  {
    name: z
      .string("Pet Name must be a string!")
      .trim()
      .min(3, "Pet Name must be at least 3 characters long!")
      .max(50, "Pet Name must be at most 50 characters long!"),
    species: z
      .string("Pet Species must be a string!")
      .trim()
      .min(3, "Pet Species must be at least 3 characters long!")
      .max(20, "Pet Species must be at most 20 characters long!"),
    breed: z
      .string("Pet Breed must be a string!")
      .trim()
      .min(3, "Pet Breed must be at least 3 characters long!")
      .max(20, "Pet Breed must be at most 20 characters long!"),
    age: z
      .number("Age must be a number!")
      .min(1, "Pet Age must be at least 1 year old!")
      .max(12, "Pet Age must be at most 12 years old!"),
    adopted: z.boolean("Adopted must be a boolean value!").default(false),
    intakeDate: z.coerce.date("Intake Date must be a valid date!"),
    adoptionDate: z.coerce
      .date("Adoption Date must be a valid date!")
      .optional(),
    photo: z
      .string("Pet Photo must be a string!")
      .url("Invalid photo URL!")
      .trim(),
    medicalRecord: z.object(
      {
        vaccinations: z.preprocess(
          (val) => {
            if (Array.isArray(val)) return val;

            if (typeof val === "string") {
              if (val.trim() === "") return [];

              if (!val.includes(",")) return [val.trim()];

              return val.split(",").filter((s) => s !== "");
            }

            return val;
          },
          z
            .array(z.string("Vaccinations must be a valid array!").trim())
            .default([]),
        ),
        weightKg: z
          .number("Pet Weight must be a number!")
          .min(1, "Pet Weight must be at least 1 KG!")
          .max(7, "Pet Weight must be at most 7 KG!"),
        microchipId: z
          .string("Microchip must be a string or null!")
          .trim()
          .nullable()
          .default(null),
      },
      "Medical Record must be a valid object!",
    ),
  },
  "Pet data is required in the request body!",
);
