import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing curve — "precise out". */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
