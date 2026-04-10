import { useThemeStore } from "@/store/themeStore";
import { UserAvatar } from "./UserAvatar";
import { Moon, Sun, Bell, Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const mobileNavItems = [
  { path: "/", label: "Dashboard" },
  { path: "/tasks", label: "Tasks" },
  { path: "/settings", label: "Settings" },
];

export function TopNavbar() {
  const { isDark, toggle } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const pageTitle =
    location.pathname === "/" ? "Dashboard" : location.pathname === "/tasks" ? "Tasks" : location.pathname === "/settings" ? "Settings" : "FlowBoard";

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border/80 bg-card/70 backdrop-blur-2xl flex items-center px-4 md:px-6 gap-4">
      <button className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
      </button>

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-extrabold text-foreground tracking-tight">{pageTitle}</h1>
        <span className="hidden sm:inline-flex text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-medium">Sprint 4</span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative p-2.5 rounded-xl hover:bg-muted transition-colors"
        >
          <Bell className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggle}
          className="p-2.5 rounded-xl hover:bg-muted transition-colors"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun className="h-[18px] w-[18px] text-warning" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon className="h-[18px] w-[18px] text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="hidden sm:flex items-center gap-2.5 ml-2 pl-3 border-l border-border">
          <UserAvatar userId="u1" size="sm" />
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-foreground leading-none">Arjun Mehta</p>
            <p className="text-xs text-muted-foreground mt-0.5">Project Lead</p>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border p-3 md:hidden z-50 shadow-lg"
          >
            {mobileNavItems.map((navItem) => (
              <Link
                key={navItem.path}
                to={navItem.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === navItem.path ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                {navItem.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
