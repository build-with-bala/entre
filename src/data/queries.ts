import type { Query } from '@/types';

export const queries: Query[] = [
  {
    id: 101,
    title: "Projector not working in Hall 3",
    description: "The projector in lecture hall 3 is not turning on. It was working yesterday during the seminar but today it's just showing a black screen.",
    category: "IT",
    createdBy: 1,
    status: "Resolved",
    resolutionTrail: [
      { step: 1, handledBy: { role: "Student", name: "Anusha" }, action: "Submitted query", timestamp: "2025-07-20T09:30:00Z" },
      { step: 2, handledBy: { role: "CR", name: "Gokul" }, action: "Received issue from Anusha and forwarded to IT Club", timestamp: "2025-07-20T10:00:00Z" },
      { step: 3, handledBy: { role: "ITClub", name: "Dinesh" }, action: "Resolved the projector issue by replacing the cable.", timestamp: "2025-07-20T12:30:00Z" }
    ]
  },
  {
    id: 102,
    title: "Request for media coverage of fest",
    description: "Need the Media Club to cover the upcoming cultural fest 'AURA 2025'. We need photographers and videographers for all three days.",
    category: "Media",
    createdBy: 6,
    status: "Pending Admin",
    resolutionTrail: [
      { step: 1, handledBy: { role: "Student", name: "Priya" }, action: "Submitted query", timestamp: "2025-07-21T11:00:00Z" },
      { step: 2, handledBy: { role: "CR", name: "Gokul" }, action: "Forwarded to Media Club", timestamp: "2025-07-22T09:00:00Z" },
      { step: 3, handledBy: { role: "MediaClub", name: "Suresh" }, action: "Budget approval required, escalated to Admin.", timestamp: "2025-07-22T10:00:00Z" }
    ]
  },
  {
    id: 103,
    title: "Wi-Fi issues in the library",
    description: "The Wi-Fi speed in the central library is extremely slow, especially on the second floor. It's making it difficult to do research.",
    category: "IT",
    createdBy: 7,
    status: "In Progress",
    resolutionTrail: [
      { step: 1, handledBy: { role: "Student", name: "Ravi" }, action: "Submitted query", timestamp: "2025-07-23T14:00:00Z" },
      { step: 2, handledBy: { role: "CR", name: "Rahul" }, action: "Forwarded to IT Club", timestamp: "2025-07-23T14:30:00Z" }
    ]
  },
  {
    id: 104,
    title: "Question about academic calendar",
    description: "When is the last day for course withdrawal for this semester? The official site seems to be down.",
    category: "Academic",
    createdBy: 8,
    status: "Resolved",
    resolutionTrail: [
       { step: 1, handledBy: { role: "Student", name: "Shashant" }, action: "Submitted query", timestamp: "2025-07-24T10:00:00Z" },
       { step: 2, handledBy: { role: "CR", name: "Rahul" }, action: "Responded with the date from the academic handbook.", timestamp: "2025-07-24T10:15:00Z" }
    ]
  }
];
