import { z } from "zod";

export const mealsPlanSchema = z.object({
  plan_code: z.string().trim(),
  name: z.string().trim(),
  goal: z.enum(["LW", "BM", "MC", "RI"], {
    message: "Please insert a valid goal: LW, BM, MC, RI",
  }),
  target_calories: z.number(),
  category: z.string({ message: "Meal Plans Category is Required" }),
  meals: z.array(
    z.object({
      meal_name: z.string().trim(),
      calories: z.number(),
      protein_g: z.number(),
      carbs_g: z.number(),
      fat_g: z.number(),
      ingredients: z.array(
        z.object({
          name_en: z.string().trim(),
          name_ar: z.string().trim(),
          quantity: z
            .number()
            .min(1, { message: "Minimum Quantity should be 1" }),
          //TODO: could be unit could be an enum
          unit: z.string().trim(),
          calories: z.number(),
          protein_g: z.number(),
          carbs_g: z.number(),
          fat_g: z.number(),
          image: z.url().trim().default(""),
        }),
      ),
      images: z.array(z.url()).optional().default([]),
      videos: z.array(z.url()).optional().default([]),
    }),
  ),
});

// TODO: change it to MP_id
export const mealsPlanUpdateParameterSchema = z.object({
  id: z.string().trim(),
});

export const mealSearchQuerySchema = z
  .object({
    name: z.string().optional(),
    category_id: z.string().optional(),
    page: z.coerce
      .number()
      .int()
      .positive()
      .gt(0, { message: "Page Number Should be Greater Than Zero" })
      .default(1),
    per_page: z.coerce
      .number()
      .int()
      .positive()
      .gt(0, { message: "Per_Page parameter should be greater than zero" })
      .default(50),
  })
  .refine(
    (data) => {
      return !!data.name || data.category_id !== undefined;
    },
    {
      message:
        "At least one search filter ('name' or 'category_id') must be provided",
      path: ["name"],
    },
  );
