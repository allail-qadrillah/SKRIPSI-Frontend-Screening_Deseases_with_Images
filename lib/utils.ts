import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FileWithPreview as File } from "@/types/file"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the "data:image/jpeg;base64," part
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
}

export function base64ToImageUrl(base64String: string): string {
  if (!base64String.startsWith("data:image")) {
    return `data:image/png;base64,${base64String}`;
  }
  return base64String;
}