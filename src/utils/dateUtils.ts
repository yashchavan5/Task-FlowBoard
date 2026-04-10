import { differenceInDays, format, isPast, isToday } from "date-fns";

export function getDeadlineInfo(deadline: string) {
  const date = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = differenceInDays(date, today);
  const overdue = isPast(date) && !isToday(date);

  let label: string;
  if (overdue) label = `${Math.abs(diff)}d overdue`;
  else if (isToday(date)) label = "Due today";
  else if (diff === 1) label = "Due tomorrow";
  else label = `${diff}d left`;

  return { label, overdue, isToday: isToday(date), formatted: format(date, "MMM d, yyyy") };
}
