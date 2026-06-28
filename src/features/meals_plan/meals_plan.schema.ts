import { z } from "zod";

export const mealsPlanSchema = z.object({
  plan_code: z.string().trim(),
  name: z.string().trim(),
  goal: z.enum(["LW", "BM", "MC", "RI"], {
    message: "Please insert a valid goal: LW, BM, MC, RI",
  }),
  target_calories: z.number(),
  category: z.object({
    id: z.number(),
    name_en: z.string().trim(),
    name_ar: z.string().trim(),
  }),
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
      images: z.array(z.url()).default([]),
      videos: z.array(z.url()).default([]),
    }),
  ),
});

export const mealsPlanUpdateQuerySchema = z.object({
  id: z.string().trim(),
});
