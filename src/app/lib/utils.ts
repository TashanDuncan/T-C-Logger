import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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