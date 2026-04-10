import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { MOCK_USERS } from "@/data/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import { Moon, Sun, Palette } from "lucide-react";

export default function SettingsPage() {
  const { isDark, toggle } = useThemeStore();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[800px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Appearance</h2>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-sm font-medium text-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground mt-0.5">Toggle between light and dark themes</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className={`relative h-10 w-[72px] rounded-full transition-colors ${isDark ? "bg-primary" : "bg-border"}`}
          >
            <motion.div
              animate={{ x: isDark ? 36 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 h-8 w-8 rounded-full bg-card shadow flex items-center justify-center"
            >
              {isDark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-warning" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Team Members</h2>
        <div className="space-y-4">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <UserAvatar userId={user.id} size="md" showName />
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
