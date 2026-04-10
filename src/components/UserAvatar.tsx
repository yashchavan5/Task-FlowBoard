import { MOCK_USERS } from "@/data/mockData";
import { motion } from "framer-motion";

interface UserAvatarProps {
  userId: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const sizeMap = { sm: "h-7 w-7 text-xs", md: "h-9 w-9 text-sm", lg: "h-11 w-11 text-base" };

export function UserAvatar({ userId, size = "md", showName = false }: UserAvatarProps) {
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`${sizeMap[size]} rounded-full flex items-center justify-center font-semibold text-primary-foreground shrink-0`}
        style={{ background: `hsl(${user.color})` }}
        title={user.name}
      >
        {user.avatar}
      </motion.div>
      {showName && <span className="text-sm font-medium text-foreground">{user.name}</span>}
    </div>
  );
}
