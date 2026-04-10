import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Task, MOCK_USERS, COLUMNS } from "@/data/mockData";
import { useTaskStore } from "@/store/taskStore";
import { X } from "lucide-react";
import { toast } from "sonner";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { addTask, updateTask } = useTaskStore();
  const isEditing = !!task;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assigneeId, setAssigneeId] = useState(task?.assigneeId || MOCK_USERS[0].id);
  const [deadline, setDeadline] = useState(task?.deadline || new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<Task["status"]>(task?.status || "not_started");
  const [priority, setPriority] = useState<Task["priority"]>(task?.priority || "medium");

  // Reset form when task changes
  useState(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssigneeId(task.assigneeId);
      setDeadline(task.deadline);
      setStatus(task.status);
      setPriority(task.priority);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEditing && task) {
      updateTask(task.id, { title, description, assigneeId, deadline, status, priority });
      toast.success("Task updated successfully");
    } else {
      addTask({ title, description, assigneeId, deadline, status, priority });
      toast.success("Task created successfully");
    }
    onClose();
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg glass-card rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">{isEditing ? "Edit Task" : "Create New Task"}</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title..." className={inputClass} required />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task..." rows={3} className={inputClass + " resize-none"} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Assignee</label>
                  <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className={inputClass}>
                    {MOCK_USERS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Deadline</label>
                  <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as Task["status"])} className={inputClass}>
                    {COLUMNS.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} className={inputClass}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all"
                >
                  {isEditing ? "Save Changes" : "Create Task"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
