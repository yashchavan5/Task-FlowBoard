import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, CheckSquare, Settings, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { tasks } = useTaskStore();
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="hidden md:flex flex-col h-screen sticky top-0 bg-card border-r border-border shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <motion.div
          whileHover={{ rotate: 8 }}
          className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow shrink-0"
        >
          <Zap className="h-4 w-4 text-primary-foreground" />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="font-extrabold text-foreground text-base tracking-tight"
            >
              FlowBoard
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3 space-y-1">
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-3 mb-3"
            >
              Menu
            </motion.p>
          )}
        </AnimatePresence>

        {navItems.map((navItem) => {
          const isActive = location.pathname === navItem.path;
          return (
            <Link key={navItem.path} to={navItem.path}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 3 }}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <navItem.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {navItem.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge for tasks in progress */}
                {navItem.path === "/tasks" && inProgress > 0 && !collapsed && (
                  <span className="ml-auto flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-warning/15 text-warning text-[10px] font-bold">
                    {inProgress}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </motion.button>
      </div>
    </motion.aside>
  );
}
