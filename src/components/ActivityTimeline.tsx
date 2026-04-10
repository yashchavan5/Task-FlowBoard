import { useTaskStore } from "@/store/taskStore";
import { MOCK_USERS } from "@/data/mockData";
import { UserAvatar } from "./UserAvatar";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function ActivityTimeline() {
  const { activities } = useTaskStore();
  const recent = activities.slice(0, 8);

  if (recent.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No activity yet. Create or update a task to see the timeline.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recent.map((item, i) => {
        const user = MOCK_USERS.find((u) => u.id === item.userId);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5">
              {user ? <UserAvatar userId={user.id} size="sm" /> : <div className="h-7 w-7 rounded-full bg-muted" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{user?.name || "System"}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {format(new Date(item.timestamp), "MMM d, h:mm a")}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
