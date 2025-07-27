import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { User, UserCheck, Camera, Laptop, Shield, BookOpen, HelpCircle } from 'lucide-react';
import type { Role } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRoleIcon(role: Role | 'Student' | 'CR' | 'MediaClub' | 'ITClub' | 'Admin') {
  switch (role) {
    case "Student":
      return User;
    case "CR":
      return UserCheck;
    case "MediaClub":
      return Camera;
    case "ITClub":
      return Laptop;
    case "Admin":
      return Shield;
    case "Academic":
        return BookOpen;
    case "General":
        return HelpCircle;
    default:
      return HelpCircle;
  }
}
