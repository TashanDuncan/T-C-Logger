import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getRatingValue(rating: number) {
  switch (rating) {
    case 1:
      return "(1) Appalling";
    case 2:
      return "(2) Horrible";
    case 3:
      return "(3) Very Bad";
    case 4:
      return "(4) Bad";
    case 5:
      return "(5) Average";
    case 6:
      return "(6) Fine";
    case 7:
      return "(7) Good";
    case 8:
      return "(8) Very Good";
    case 9:
      return "(9) Great";
    case 10:
      return "(10) Masterpiece";
    default:
      return "No Rating";
  }
}