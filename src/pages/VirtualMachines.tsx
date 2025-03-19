
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { VirtualMachineCard } from "@/components/VirtualMachineCard";
import {
  ChevronDown,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VirtualMachines = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  
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
    {
      id: "vm-5",
      name: "API Gateway",
      os: "Alpine Linux",
      status: "running" as const,
      cpu: { allocated: 2, used: 0.7 },
      ram: { allocated: 4, used: 2.3 },
      storage: { allocated: 40, used: 15 },
      ip: "192.168.1.104",
    },
    {
      id: "vm-6",
      name: "Load Balancer",
      os: "FreeBSD 13",
      status: "running" as const,
      cpu: { allocated: 2, used: 0.4 },
      ram: { allocated: 4, used: 1.8 },
      storage: { allocated: 30, used: 12 },
      ip: "192.168.1.105",
    },
    {
      id: "vm-7",
      name: "Backup Server",
      os: "Debian 11",
      status: "running" as const,
      cpu: { allocated: 4, used: 1.2 },
      ram: { allocated: 8, used: 6.5 },
      storage: { allocated: 2000, used: 1200 },
      ip: "192.168.1.106",
    },
    {
      id: "vm-8",
      name: "Monitoring Server",
      os: "Ubuntu 20.04 LTS",
      status: "running" as const,
      cpu: { allocated: 4, used: 2.5 },
      ram: { allocated: 8, used: 5.8 },
      storage: { allocated: 100, used: 65 },
      ip: "192.168.1.107",
    },
  ];
  
  const filteredVMs = filter === "all" 
    ? vms 
    : vms.filter(vm => vm.status === filter);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto page-transition">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <Monitor className="h-6 w-6" />
                  Virtual Machines
                </h1>
                <p className="text-muted-foreground">
                  Manage and monitor your virtual machines
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Create VM</span>
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search virtual machines..."
                  className="w-full pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <SlidersHorizontal className="h-4 w-4" /> 
                      Filter
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                      <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="running">Running</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="stopped">Stopped</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="paused">Paused</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Tabs value={view} onValueChange={setView} className="hidden sm:block">
                  <TabsList className="h-9">
                    <TabsTrigger value="grid" className="h-8 px-3">
                      Grid
                    </TabsTrigger>
                    <TabsTrigger value="list" className="h-8 px-3">
                      List
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <TabsContent value="grid" className="m-0">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredVMs.map((vm) => (
                  <VirtualMachineCard key={vm.id} {...vm} />
                ))}
              </div>
              
              {filteredVMs.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No virtual machines found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try changing your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="m-0">
              <div className="border rounded-md divide-y">
                {filteredVMs.map((vm) => (
                  <div key={vm.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between">
                    <div>
                      <div className="font-medium">{vm.name}</div>
                      <div className="text-sm text-muted-foreground">{vm.os}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">CPU:</span> {vm.cpu.used}/{vm.cpu.allocated}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">RAM:</span> {vm.ram.used}/{vm.ram.allocated} GB
                      </div>
                      <div className="hidden md:block">
                        {vm.ip && (
                          <div className="text-sm font-mono">{vm.ip}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VirtualMachines;
