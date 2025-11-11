import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UAParser } from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Parses a user agent string and returns device and browser info using ua-parser-js.
 * @param userAgent The user agent string
 * @returns { device: string, browser: string }
 */
export function parseUserAgent(userAgent?: string): {
  device: string;
  browser: string;
} {
  if (!userAgent) {
    return { device: "Unknown", browser: "Unknown" };
  }
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  const browser = parser.getBrowser();
  return {
    device: os.name || "Unknown",
    browser: browser.name || "Unknown",
  };
}