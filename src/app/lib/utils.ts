import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export enum RatingValue {
  Appalling = "(1) Appalling",
  Horrible = "(2) Horrible",
  VeryBad = "(3) Very Bad",
  Bad = "(4) Bad",
  Average = "(5) Average",
  Fine = "(6) Fine",
  Good = "(7) Good",
  VeryGood = "(8) Very Good",
  Great = "(9) Great",
  Masterpiece = "(10) Masterpiece",
  NoRating = "No Rating",
}

export function getRatingValue(rating: number) {
  switch (rating) {
    case 1:
      return RatingValue.Appalling;
    case 2:
      return RatingValue.Horrible;
    case 3:
      return RatingValue.VeryBad;
    case 4:
      return RatingValue.Bad;
    case 5:
      return RatingValue.Average;
    case 6:
      return RatingValue.Fine;
    case 7:
      return RatingValue.Good;
    case 8:
      return RatingValue.VeryGood;
    case 9:
      return RatingValue.Great;
    case 10:
      return RatingValue.Masterpiece;
    default:
      return RatingValue.NoRating;
  }
}

const FormSchema = z.object({
  id: z.number().int(),
  title: z.string({
    invalid_type_error: "Please select a title.",
  }),
  description: z
    .string({
      invalid_type_error: "Please select a description.",
    })
    .optional(),
  rating: z.coerce
    .number()
    .int()
    .gte(0)
    .lte(10, "Rating must be between 0 and 10.")
    .optional(),
  experienced: z.boolean({
    invalid_type_error: "Please select a valid experienced value.",
  }),
  category: z.string({
    invalid_type_error: "Please select a valid category.",
  }),
  review: z
    .string({
      invalid_type_error: "Please select a valid review.",
    })
    .optional(),
  date: z.string(),
});

export const CreateItemSchema = FormSchema.omit({ id: true, date: true });
export const UserItemSchema = FormSchema.omit({
  title: true,
  description: true,
  date: true,
  category: true,
});
