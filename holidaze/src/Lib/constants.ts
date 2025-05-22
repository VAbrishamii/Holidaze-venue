/**
 * API base URL from environment
 
 */
if (!process.env.NEXT_PUBLIC_API_BASE || !process.env.NEXT_PUBLIC_API_KEY) {
  throw new Error(
    "Missing environment variables. Did you forget to add .env.local?"
  );
}

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
