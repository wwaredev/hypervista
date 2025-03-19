
import { cn } from "@/lib/utils";

type StatusType = "running" | "stopped" | "paused" | "error" | "provisioning";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  running: {
    label: "Running",
    className: "bg-hypergreen-100 text-hypergreen-800",
  },
  stopped: {
    label: "Stopped",
    className: "bg-gray-100 text-gray-800",
  },
  paused: {
    label: "Paused",
    className: "bg-amber-100 text-amber-800",
  },
  error: {
    label: "Error",
    className: "bg-red-100 text-red-800",
  },
  provisioning: {
    label: "Provisioning",
    className: "bg-hyperblue-100 text-hyperblue-800",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn("status-badge", config.className, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
        "bg-hypergreen-500": status === "running",
        "bg-gray-500": status === "stopped",
        "bg-amber-500": status === "paused",
        "bg-red-500": status === "error",
        "bg-hyperblue-500": status === "provisioning",
      })}></span>
      {config.label}
    </span>
  );
};
