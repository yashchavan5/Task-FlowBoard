import { useState } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "@/store/taskStore";
import { MOCK_USERS } from "@/data/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { CheckCircle2, Clock, ListTodo, TrendingUp, Plus, ArrowUpRight, BarChart3 } from "lucide-react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { SearchFilter } from "@/components/SearchFilter";
import { TaskModal } from "@/components/TaskModal";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function DashboardPage() {
  const { tasks } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const notStarted = tasks.filter((t) => t.status === "not_started").length;
  const rate = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: ListTodo, accent: "from-primary/20 to-primary/5", iconBg: "bg-primary/10", iconColor: "text-primary", change: "+3 this week" },
    { label: "In Progress", value: inProgress, icon: Clock, accent: "from-warning/20 to-warning/5", iconBg: "bg-warning/10", iconColor: "text-warning", change: "Active now" },
    { label: "Completed", value: completed, icon: CheckCircle2, accent: "from-success/20 to-success/5", iconBg: "bg-success/10", iconColor: "text-success", change: `${rate}% rate` },
    { label: "Not Started", value: notStarted, icon: BarChart3, accent: "from-accent/20 to-accent/5", iconBg: "bg-accent/10", iconColor: "text-accent", change: "Pending" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"},</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Project Overview
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-glow transition-all shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Task
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden glass-card rounded-2xl p-5 md:p-6 group cursor-default"
          >
            {/* Subtle gradient accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
                <span className="text-xs text-muted-foreground/70">{stat.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Completion ring + filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <div className="flex items-center gap-4 glass-card rounded-2xl px-5 py-3 shrink-0">
          {/* Mini progress ring */}
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3" className="stroke-muted" />
              <motion.circle
                cx="24" cy="24" r="20" fill="none" strokeWidth="3"
                strokeLinecap="round"
                className="stroke-primary"
                strokeDasharray={125.6}
                initial={{ strokeDashoffset: 125.6 }}
                animate={{ strokeDashoffset: 125.6 - (125.6 * rate) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{rate}%</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Sprint Progress</p>
            <p className="text-xs text-muted-foreground">{completed} of {totalTasks} tasks done</p>
          </div>
        </div>

        <div className="flex-1">
          <SearchFilter />
        </div>
      </div>

      {/* Kanban Board */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="h-1 w-6 rounded-full gradient-primary" />
          <h3 className="text-base font-bold text-foreground">Board View</h3>
        </div>
        <KanbanBoard />
      </section>

      {/* Bottom section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-5 gap-6"
      >
        {/* Team */}
        <motion.div variants={item} className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-foreground">Team Workload</h3>
            <span className="text-xs text-muted-foreground">{MOCK_USERS.length} members</span>
          </div>
          <div className="space-y-4">
            {MOCK_USERS.map((user) => {
              const userTasks = tasks.filter((t) => t.assigneeId === user.id);
              const userCompleted = userTasks.filter((t) => t.status === "completed").length;
              const progress = userTasks.length > 0 ? (userCompleted / userTasks.length) * 100 : 0;
              return (
                <div key={user.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <UserAvatar userId={user.id} size="sm" showName />
                    <span className="text-xs font-medium text-muted-foreground">
                      {userCompleted}/{userTasks.length}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div variants={item} className="lg:col-span-3 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-foreground">Recent Activity</h3>
            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View all</span>
          </div>
          <ActivityTimeline />
        </motion.div>
      </motion.div>

      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
