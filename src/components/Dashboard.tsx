
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ResourceUsage } from "@/components/ResourceUsage";
import { VirtualMachineCard } from "@/components/VirtualMachineCard";
import { Monitor, Server, HardDrive, AlertTriangle } from "lucide-react";

export const Dashboard = () => {
  // Mock VM data for demonstration
  const vms = [
    {
      id: "vm-1",
      name: "Web Server",
      os: "Ubuntu 22.04 LTS",
      status: "running" as const,
      cpu: { allocated: 4, used: 1.8 },
      ram: { allocated: 8, used: 5.2 },
      storage: { allocated: 100, used: 42 },
      ip: "192.168.1.100",
    },
    {
      id: "vm-2",
      name: "Database Server",
      os: "CentOS 8",
      status: "running" as const,
      cpu: { allocated: 8, used: 5.6 },
      ram: { allocated: 32, used: 24.8 },
      storage: { allocated: 500, used: 320 },
      ip: "192.168.1.101",
    },
    {
      id: "vm-3",
      name: "Development VM",
      os: "Windows Server 2022",
      status: "stopped" as const,
      cpu: { allocated: 4, used: 0 },
      ram: { allocated: 16, used: 0 },
      storage: { allocated: 250, used: 98 },
    },
    {
      id: "vm-4",
      name: "Test Environment",
      os: "Debian 11",
      status: "paused" as const,
      cpu: { allocated: 2, used: 0.1 },
      ram: { allocated: 4, used: 3.1 },
      storage: { allocated: 80, used: 45 },
      ip: "192.168.1.103",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 p-6 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-fade-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Virtual Machines</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              8 running, 3 stopped, 1 paused
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-up animate-delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Physical Hosts</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              All hosts online, cluster healthy
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-up animate-delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 TB</div>
            <p className="text-xs text-muted-foreground">
              Of 12 TB total (40%)
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-up animate-delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 warning, 1 information
            </p>
          </CardContent>
        </Card>
      </div>
      
      <ResourceUsage />
      
      <h2 className="text-xl font-semibold mt-2">Recent Virtual Machines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {vms.map((vm) => (
          <VirtualMachineCard key={vm.id} {...vm} />
        ))}
      </div>
    </div>
  );
};
