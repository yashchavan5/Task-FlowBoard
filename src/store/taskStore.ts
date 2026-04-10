import { create } from "zustand";
import { Task, MOCK_TASKS, ActivityItem } from "@/data/mockData";

interface TaskState {
  tasks: Task[];
  activities: ActivityItem[];
  searchQuery: string;
  filterAssignee: string;
  filterPriority: string;
  setSearchQuery: (q: string) => void;
  setFilterAssignee: (id: string) => void;
  setFilterPriority: (p: string) => void;
  addTask: (task: Omit<Task, "id" | "createdAt" | "order">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Task["status"], newOrder: number) => void;
  reorderInColumn: (status: Task["status"], activeId: string, overId: string) => void;
  getFilteredTasks: () => Task[];
}

let nextId = 100;

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: MOCK_TASKS,
  activities: [],
  searchQuery: "",
  filterAssignee: "all",
  filterPriority: "all",

  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilterAssignee: (id) => set({ filterAssignee: id }),
  setFilterPriority: (p) => set({ filterPriority: p }),

  addTask: (taskData) => {
    const id = `t${++nextId}`;
    const task: Task = {
      ...taskData,
      id,
      createdAt: new Date().toISOString(),
      order: get().tasks.filter((t) => t.status === taskData.status).length,
    };
    set((s) => ({
      tasks: [...s.tasks, task],
      activities: [
        { id: `a${Date.now()}`, taskId: id, action: `Created task "${task.title}"`, timestamp: new Date().toISOString(), userId: task.assigneeId },
        ...s.activities,
      ],
    }));
  },

  updateTask: (id, updates) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      activities: [
        { id: `a${Date.now()}`, taskId: id, action: `Updated task`, timestamp: new Date().toISOString(), userId: s.tasks.find((t) => t.id === id)?.assigneeId || "" },
        ...s.activities,
      ],
    })),

  deleteTask: (id) =>
    set((s) => ({
      tasks: s.tasks.filter((t) => t.id !== id),
      activities: [
        { id: `a${Date.now()}`, taskId: id, action: `Deleted task`, timestamp: new Date().toISOString(), userId: "" },
        ...s.activities,
      ],
    })),

  moveTask: (taskId, newStatus, newOrder) =>
    set((s) => {
      const tasks = s.tasks.map((t) => {
        if (t.id === taskId) return { ...t, status: newStatus, order: newOrder };
        return t;
      });
      return {
        tasks,
        activities: [
          { id: `a${Date.now()}`, taskId, action: `Moved to ${newStatus.replace("_", " ")}`, timestamp: new Date().toISOString(), userId: "" },
          ...s.activities,
        ],
      };
    }),

  reorderInColumn: (status, activeId, overId) =>
    set((s) => {
      const columnTasks = s.tasks.filter((t) => t.status === status).sort((a, b) => a.order - b.order);
      const activeIdx = columnTasks.findIndex((t) => t.id === activeId);
      const overIdx = columnTasks.findIndex((t) => t.id === overId);
      if (activeIdx === -1 || overIdx === -1) return s;

      const [moved] = columnTasks.splice(activeIdx, 1);
      columnTasks.splice(overIdx, 0, moved);

      const reordered = columnTasks.map((t, i) => ({ ...t, order: i }));
      const otherTasks = s.tasks.filter((t) => t.status !== status);
      return { tasks: [...otherTasks, ...reordered] };
    }),

  getFilteredTasks: () => {
    const { tasks, searchQuery, filterAssignee, filterPriority } = get();
    return tasks.filter((t) => {
      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) && !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterAssignee !== "all" && t.assigneeId !== filterAssignee) return false;
      if (filterPriority !== "all" && t.priority !== filterPriority) return false;
      return true;
    });
  },
}));
