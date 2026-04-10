import { Task } from "@/data/mockData";
import { UserAvatar } from "./UserAvatar";
import { PriorityBadge } from "./PriorityBadge";
import { DeadlineBadge } from "./DeadlineBadge";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { getDeadlineInfo } from "@/utils/dateUtils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { overdue } = getDeadlineInfo(task.deadline);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className={`group relative bg-card rounded-xl p-4 cursor-grab active:cursor-grabbing border border-border/60 shadow-soft hover:shadow-lg transition-shadow duration-200 ${
        overdue && task.status !== "completed" ? "ring-1 ring-destructive/25 border-destructive/20" : ""
      } ${isDragging ? "shadow-2xl z-50" : ""}`}
    >
      {/* Left color bar */}
      <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${
        task.priority === "high" ? "bg-destructive" : task.priority === "medium" ? "bg-warning" : "bg-success"
      }`} />

      <div className="pl-2">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <PriorityBadge priority={task.priority} />
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <div {...attributes} {...listeners} className="p-1 rounded-md hover:bg-muted cursor-grab transition-colors">
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <button onClick={() => onEdit(task)} className="p-1 rounded-md hover:bg-muted transition-colors">
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <button onClick={() => onDelete(task.id)} className="p-1 rounded-md hover:bg-destructive/10 transition-colors">
              <Trash2 className="h-3.5 w-3.5 text-destructive/70" />
            </button>
          </div>
        </div>

        <h4 className="font-semibold text-[13px] text-card-foreground mb-1 line-clamp-2 leading-snug">{task.title}</h4>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{task.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <UserAvatar userId={task.assigneeId} size="sm" />
          <DeadlineBadge deadline={task.deadline} />
        </div>
      </div>
    </motion.div>
  );
}
