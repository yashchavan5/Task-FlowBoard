import { useState, useCallback } from "react";
import { Task, COLUMNS } from "@/data/mockData";
import { useTaskStore } from "@/store/taskStore";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { toast } from "sonner";

export function KanbanBoard() {
  const { getFilteredTasks, moveTask, reorderInColumn, deleteTask } = useTaskStore();
  const tasks = getFilteredTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTaskItem = tasks.find((t) => t.id === activeId);
    if (!activeTaskItem) return;

    // Check if dragging over a column
    const isOverColumn = COLUMNS.some((c) => c.id === overId);
    if (isOverColumn) {
      const newStatus = overId as Task["status"];
      if (activeTaskItem.status !== newStatus) {
        const columnTasks = tasks.filter((t) => t.status === newStatus);
        moveTask(activeId, newStatus, columnTasks.length);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTaskItem = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTaskItem) return;

    if (overTask && activeTaskItem.status === overTask.status) {
      reorderInColumn(activeTaskItem.status, activeId, overId);
    } else if (overTask) {
      moveTask(activeId, overTask.status, overTask.order);
    }
  };

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    deleteTask(id);
    toast.error("Task deleted");
  }, [deleteTask]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingTask(null);
  }, []);

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const columnTasks = tasks.filter((t) => t.status === col.id).sort((a, b) => a.order - b.order);
            return (
              <KanbanColumn
                key={col.id}
                columnId={col.id}
                tasks={columnTasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="glass-card rounded-lg p-4 shadow-2xl opacity-90 rotate-2 w-[300px]">
              <p className="font-semibold text-sm text-card-foreground">{activeTask.title}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal isOpen={modalOpen} onClose={handleCloseModal} task={editingTask} />
    </>
  );
}
