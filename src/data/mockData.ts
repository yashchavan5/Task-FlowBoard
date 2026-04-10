export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string; // initials
  color: string; // hsl color
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  deadline: string; // ISO date
  status: "not_started" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  order: number;
}

export interface ActivityItem {
  id: string;
  taskId: string;
  action: string;
  timestamp: string;
  userId: string;
}

export const MOCK_USERS: User[] = [
  { id: "u1", name: "Arjun Mehta", email: "arjun@flowboard.io", avatar: "AM", color: "234 89% 64%" },
  { id: "u2", name: "Priya Sharma", email: "priya@flowboard.io", avatar: "PS", color: "172 66% 50%" },
  { id: "u3", name: "Rahul Kapoor", email: "rahul@flowboard.io", avatar: "RK", color: "38 92% 50%" },
  { id: "u4", name: "Sneha Gupta", email: "sneha@flowboard.io", avatar: "SG", color: "340 82% 52%" },
  { id: "u5", name: "Vikram Patel", email: "vikram@flowboard.io", avatar: "VP", color: "152 69% 41%" },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t1", title: "Design new landing page", description: "Create wireframes and high-fidelity mockups for the redesigned landing page with modern aesthetics.",
    assigneeId: "u1", deadline: "2026-04-15", status: "in_progress", priority: "high", createdAt: "2026-04-01", order: 0,
  },
  {
    id: "t2", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated testing and deployment to staging environment.",
    assigneeId: "u3", deadline: "2026-04-12", status: "not_started", priority: "high", createdAt: "2026-04-02", order: 0,
  },
  {
    id: "t3", title: "User authentication flow", description: "Implement login, registration, and password reset flows with proper validation.",
    assigneeId: "u2", deadline: "2026-04-18", status: "in_progress", priority: "medium", createdAt: "2026-04-03", order: 1,
  },
  {
    id: "t4", title: "API documentation", description: "Write comprehensive API docs using OpenAPI spec for all REST endpoints.",
    assigneeId: "u4", deadline: "2026-04-08", status: "not_started", priority: "low", createdAt: "2026-04-04", order: 1,
  },
  {
    id: "t5", title: "Performance audit", description: "Run Lighthouse audits and optimize Core Web Vitals across all pages.",
    assigneeId: "u5", deadline: "2026-04-20", status: "not_started", priority: "medium", createdAt: "2026-04-05", order: 2,
  },
  {
    id: "t6", title: "Database migration script", description: "Write migration scripts for the new schema changes in PostgreSQL.",
    assigneeId: "u1", deadline: "2026-04-09", status: "completed", priority: "high", createdAt: "2026-04-01", order: 0,
  },
  {
    id: "t7", title: "Mobile responsive fixes", description: "Fix layout issues on mobile devices for dashboard and task views.",
    assigneeId: "u2", deadline: "2026-04-14", status: "completed", priority: "medium", createdAt: "2026-04-02", order: 1,
  },
  {
    id: "t8", title: "Write unit tests", description: "Add unit tests for the task store and utility functions with full coverage.",
    assigneeId: "u3", deadline: "2026-04-16", status: "in_progress", priority: "low", createdAt: "2026-04-06", order: 2,
  },
];

export const COLUMNS = [
  { id: "not_started" as const, title: "Not Started", emoji: "📋" },
  { id: "in_progress" as const, title: "In Progress", emoji: "🔄" },
  { id: "completed" as const, title: "Completed", emoji: "✅" },
];
