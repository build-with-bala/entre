export type Role = "Student" | "CR" | "MediaClub" | "ITClub" | "Admin";

export type Category = "IT" | "Media" | "Academic" | "General";

export interface User {
  id: number;
  name: string;
  role: Role;
  class?: string;
  club?: string;
}

export interface ResolutionStep {
  step: number;
  handledBy: {
    role: Role;
    name: string;
  };
  action: string;
  timestamp: string;
}

export interface Query {
  id: number;
  title: string;
  description: string;
  category: Category;
  createdBy: number;
  status: "Resolved" | "Pending" | "In Progress" | "Pending Admin";
  resolutionTrail: ResolutionStep[];
}
