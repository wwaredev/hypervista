
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { VirtualMachineCard } from "@/components/VirtualMachineCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  FilterX,
  Check,
  X,
  AlertTriangle,
  UploadCloud,
  Download,
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const VirtualMachines = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
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
      tags: ["production", "web"],
      host: "node-1",
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
      tags: ["production", "database"],
      host: "node-2",
    },
    {
      id: "vm-3",
      name: "Development VM",
      os: "Windows Server 2022",
      status: "stopped" as const,
      cpu: { allocated: 4, used: 0 },
      ram: { allocated: 16, used: 0 },
      storage: { allocated: 250, used: 98 },
      tags: ["development"],
      host: "node-1",
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
      tags: ["testing"],
      host: "node-3",
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
      tags: ["production", "api"],
      host: "node-1",
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
      tags: ["production", "network"],
      host: "node-2",
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
      tags: ["production", "backup"],
      host: "node-3",
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
      tags: ["production", "monitoring"],
      host: "node-1",
    },
    {
      id: "vm-9",
      name: "CI/CD Server",
      os: "Ubuntu 22.04 LTS",
      status: "error" as const,
      cpu: { allocated: 4, used: 0 },
      ram: { allocated: 16, used: 0 },
      storage: { allocated: 200, used: 75 },
      ip: "192.168.1.108",
      tags: ["development", "ci-cd"],
      host: "node-2",
    },
    {
      id: "vm-10",
      name: "File Server",
      os: "OpenSUSE Leap 15.4",
      status: "running" as const,
      cpu: { allocated: 2, used: 0.3 },
      ram: { allocated: 4, used: 2.2 },
      storage: { allocated: 4000, used: 1800 },
      ip: "192.168.1.109",
      tags: ["production", "storage"],
      host: "node-3",
    },
    {
      id: "vm-11",
      name: "Mail Server",
      os: "Debian 11",
      status: "running" as const,
      cpu: { allocated: 4, used: 1.1 },
      ram: { allocated: 8, used: 5.4 },
      storage: { allocated: 500, used: 320 },
      ip: "192.168.1.110",
      tags: ["production", "mail"],
      host: "node-2",
    },
    {
      id: "vm-12",
      name: "Legacy Application",
      os: "CentOS 7",
      status: "warning" as const,
      cpu: { allocated: 2, used: 1.8 },
      ram: { allocated: 4, used: 3.8 },
      storage: { allocated: 100, used: 95 },
      ip: "192.168.1.111",
      tags: ["production", "legacy"],
      host: "node-1",
    },
  ];
  
  // Filter VMs based on status and search query
  const filteredVMs = vms.filter(vm => {
    const matchesStatus = filter === "all" || vm.status === filter;
    const matchesSearch = 
      searchQuery === "" || 
      vm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vm.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vm.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (vm.ip && vm.ip.includes(searchQuery));
    
    return matchesStatus && matchesSearch;
  });

  // Get summary stats
  const stats = {
    total: vms.length,
    running: vms.filter(vm => vm.status === "running").length,
    stopped: vms.filter(vm => vm.status === "stopped").length,
    paused: vms.filter(vm => vm.status === "paused").length,
    warning: vms.filter(vm => vm.status === "warning").length,
    error: vms.filter(vm => vm.status === "error").length,
  };

  // Action buttons for VM operations (these would trigger actual operations in a real app)
  const vmActions = [
    { label: "Start", icon: Check, color: "bg-hypergreen-500" },
    { label: "Stop", icon: X, color: "bg-red-500" },
    { label: "Pause", icon: AlertTriangle, color: "bg-amber-500" },
    { label: "Snapshot", icon: Download, color: "bg-hyperblue-500" },
    { label: "Clone", icon: UploadCloud, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto page-transition">
          <ScrollArea className="h-full">
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
                  <Button variant="outline" size="icon" title="Refresh">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <SummaryCard title="Total" value={stats.total} bgColor="bg-muted" />
                <SummaryCard title="Running" value={stats.running} bgColor="bg-hypergreen-100 text-hypergreen-800" />
                <SummaryCard title="Stopped" value={stats.stopped} bgColor="bg-red-100 text-red-800" />
                <SummaryCard title="Paused" value={stats.paused} bgColor="bg-amber-100 text-amber-800" />
                <SummaryCard title="Warning" value={stats.warning} bgColor="bg-amber-100 text-amber-800" />
                <SummaryCard title="Error" value={stats.error} bgColor="bg-red-100 text-red-800" />
              </div>
              
              {/* Quick Actions */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold mb-3 text-muted-foreground">QUICK ACTIONS</h2>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {vmActions.map((action) => (
                    <div key={action.label} className="flex-shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-16 w-24 flex flex-col gap-1 items-center justify-center"
                      >
                        <div className={`${action.color} p-1.5 rounded-full text-white`}>
                          <action.icon className="h-3.5 w-3.5" />
                        </div>
                        <span>{action.label}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name, OS, IP, or tag..."
                    className="w-full pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                        <DropdownMenuRadioItem value="warning">Warning</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="error">Error</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Node</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem>
                        Node 1
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Node 2
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Node 3
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {filter !== "all" && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setFilter("all")}
                      title="Clear filters"
                    >
                      <FilterX className="h-4 w-4" />
                    </Button>
                  )}
                  
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
              
              <Tabs value={view} className="mt-2">
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
                          <div className="flex items-center gap-2">
                            <StatusIndicator status={vm.status} />
                            <div className="font-medium">{vm.name}</div>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <div className="text-sm text-muted-foreground">{vm.os}</div>
                            {vm.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-sm space-y-1 hidden md:block">
                            <div>
                              <span className="text-muted-foreground">CPU:</span>{" "}
                              {vm.cpu.used}/{vm.cpu.allocated}
                            </div>
                            <div>
                              <span className="text-muted-foreground">RAM:</span>{" "}
                              {vm.ram.used}/{vm.ram.allocated} GB
                            </div>
                          </div>
                          <div className="hidden md:block">
                            {vm.ip && (
                              <div className="text-sm font-mono">{vm.ip}</div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Console
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>VM Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="start">Start</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="stop">Stop</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="reboot">Reboot</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="snapshot">Snapshot</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="clone">Clone</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="delete" className="text-destructive">Delete</DropdownMenuRadioItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
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
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

// Helper component for the summary cards
const SummaryCard = ({ 
  title, 
  value, 
  bgColor = "bg-muted" 
}: { 
  title: string; 
  value: number; 
  bgColor?: string;
}) => {
  return (
    <Card className={`${bgColor} border-none`}>
      <CardContent className="p-4 text-center">
        <div className="text-xl font-bold">{value}</div>
        <div className="text-sm">{title}</div>
      </CardContent>
    </Card>
  );
};

// Helper component for status indicators in list view
const StatusIndicator = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "running":
        return "bg-hypergreen-500";
      case "stopped":
        return "bg-red-500";
      case "paused":
        return "bg-amber-500";
      case "warning":
        return "bg-amber-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };
  
  return (
    <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} title={status} />
  );
};

export default VirtualMachines;
