import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "@/store/taskStore";
import { MOCK_USERS, COLUMNS } from "@/data/mockData";
import { Task } from "@/data/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import { PriorityBadge } from "@/components/PriorityBadge";
import { DeadlineBadge } from "@/components/DeadlineBadge";
import { TaskModal } from "@/components/TaskModal";
import { SearchFilter } from "@/components/SearchFilter";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function TasksPage() {
  const { getFilteredTasks, deleteTask } = useTaskStore();
  const tasks = getFilteredTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    toast.error("Task deleted");
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchFilter />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setEditingTask(null); setModalOpen(true); }}
          className="flex items-center gap-2 gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm shadow-glow shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Task
        </motion.button>
      </div>

      {/* Table view */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Assignee</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Priority</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Deadline</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => {
                const statusCol = COLUMNS.find((c) => c.id === task.status);
                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{task.description}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <UserAvatar userId={task.assigneeId} size="sm" showName />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs font-medium text-muted-foreground">{statusCol?.title}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <DeadlineBadge deadline={task.deadline} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(task)} className="p-1.5 rounded hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(task.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {tasks.length === 0 && (
          <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">No tasks found</div>
        )}
      </motion.div>

      <TaskModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingTask(null); }} task={editingTask} />
    </div>
  );
}
