import { CpuIcon, HardDrive, MemoryStick, PlayCircle, PowerOff, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface VirtualMachineCardProps {
  id: string;
  name: string;
  os: string;
  status: "running" | "stopped" | "paused" | "error" | "provisioning";
  cpu: {
    allocated: number;
    used: number;
  };
  ram: {
    allocated: number;
    used: number;
  };
  storage: {
    allocated: number;
    used: number;
  };
  ip?: string;
}

export const VirtualMachineCard = ({
  id,
  name,
  os,
  status,
  cpu,
  ram,
  storage,
  ip,
}: VirtualMachineCardProps) => {
  const cpuUsage = Math.round((cpu.used / cpu.allocated) * 100);
  const ramUsage = Math.round((ram.used / ram.allocated) * 100);
  const storageUsage = Math.round((storage.used / storage.allocated) * 100);

  return (
    <Card className="overflow-hidden card-hover border border-border animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium">{name}</CardTitle>
            <div className="text-sm text-muted-foreground">{os}</div>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CpuIcon className="h-3.5 w-3.5" />
                <span>CPU</span>
              </div>
              <span className="font-medium">{cpuUsage}%</span>
            </div>
            <Progress value={cpuUsage} className="h-1" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MemoryStick className="h-3.5 w-3.5" />
                <span>RAM</span>
              </div>
              <span className="font-medium">{ram.used} GB / {ram.allocated} GB</span>
            </div>
            <Progress value={ramUsage} className="h-1" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <HardDrive className="h-3.5 w-3.5" />
                <span>Storage</span>
              </div>
              <span className="font-medium">{storage.used} GB / {storage.allocated} GB</span>
            </div>
            <Progress value={storageUsage} className="h-1" />
          </div>
          
          {ip && (
            <div className="text-sm pt-1">
              <span className="text-muted-foreground">IP:</span>{" "}
              <span className="font-mono">{ip}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {status === "running" ? (
          <>
            <Button variant="outline" size="sm" className="gap-1">
              <PauseCircle className="h-4 w-4" />
              <span>Pause</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <PowerOff className="h-4 w-4" />
              <span>Stop</span>
            </Button>
          </>
        ) : status === "paused" ? (
          <>
            <Button variant="outline" size="sm" className="gap-1">
              <PlayCircle className="h-4 w-4" />
              <span>Resume</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <PowerOff className="h-4 w-4" />
              <span>Stop</span>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" className="gap-1">
              <PlayCircle className="h-4 w-4" />
              <span>Start</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                <DropdownMenuItem>Clone</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
