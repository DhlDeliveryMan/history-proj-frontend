import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { socket } from "./socket";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSecondsToMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export const connectSocket = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.connect();

    socket.on("connect", () => resolve());
    socket.on("connect_error", (error) => reject(error));
  });
};
