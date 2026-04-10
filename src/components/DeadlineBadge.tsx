import { getDeadlineInfo } from "@/utils/dateUtils";
import { Clock } from "lucide-react";

export function DeadlineBadge({ deadline }: { deadline: string }) {
  const info = getDeadlineInfo(deadline);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        info.overdue
          ? "text-destructive"
          : info.isToday
          ? "text-warning"
          : "text-muted-foreground"
      }`}
      title={info.formatted}
    >
      <Clock className="h-3 w-3" />
      {info.label}
    </span>
  );
}
