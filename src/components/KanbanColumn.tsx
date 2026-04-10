import { motion } from "framer-motion";
import { Task, COLUMNS } from "@/data/mockData";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Inbox } from "lucide-react";

interface KanbanColumnProps {
  columnId: Task["status"];
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function KanbanColumn({ columnId, tasks, onEdit, onDelete }: KanbanColumnProps) {
  const column = COLUMNS.find((c) => c.id === columnId)!;
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  const dotColors = {
    not_started: "bg-muted-foreground",
    in_progress: "bg-primary",
    completed: "bg-success",
  };

  const headerAccent = {
    not_started: "border-muted-foreground/30",
    in_progress: "border-primary/40",
    completed: "border-success/40",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: COLUMNS.findIndex((c) => c.id === columnId) * 0.12, type: "spring", stiffness: 300, damping: 24 }}
      className="flex-1 min-w-[300px] max-w-[420px]"
    >
      {/* Column header */}
      <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 ${headerAccent[columnId]}`}>
        <div className="flex items-center gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full ${dotColors[columnId]} ring-4 ring-background`} />
          <h3 className="font-bold text-sm text-foreground tracking-tight">{column.title}</h3>
        </div>
        <span className="flex items-center justify-center h-6 min-w-[24px] px-2 rounded-lg bg-muted text-xs font-bold text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={`rounded-2xl p-2.5 min-h-[260px] bg-muted/30 transition-all duration-200 ${
          isOver ? "ring-2 ring-primary/30 bg-primary/5 scale-[1.01]" : ""
        }`}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2.5">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground/60">
            <Inbox className="h-8 w-8 mb-2" />
            <span className="text-xs font-medium">Drop tasks here</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
