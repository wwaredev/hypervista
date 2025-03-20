
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { VirtualMachineCard } from "@/components/VirtualMachineCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Monitor,
  Plus, 
  Search, 
  Filter, 
  RefreshCw,
  ArrowUpDown,
  Play,
  StopCircle,
  Pause,
  Trash2,
} from "lucide-react";

// The critical fix here is ensuring that the status values match the expected type
// in VirtualMachineCardProps
const VirtualMachines = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock VM data with status values that match VirtualMachineCardProps type
  const virtualMachines = [
    {
      id: "vm-1",
      name: "web-server-01",
      os: "Ubuntu 22.04 LTS",
      status: "running", 
      cpu: { allocated: 4, used: 2.4 },
      ram: { allocated: 8, used: 6.2 },
      storage: { allocated: 80, used: 42.5 },
      ip: "192.168.1.101",
      tags: ["web", "production"],
      host: "node-01",
    },
    {
      id: "vm-2",
      name: "db-server-01",
      os: "CentOS 8",
      status: "running", 
      cpu: { allocated: 8, used: 7.1 },
      ram: { allocated: 16, used: 14.2 },
      storage: { allocated: 500, used: 320.5 },
      ip: "192.168.1.102",
      tags: ["database", "production"],
      host: "node-02",
    },
    {
      id: "vm-3",
      name: "dev-server-01",
      os: "Windows Server 2022",
      status: "paused", 
      cpu: { allocated: 4, used: 0 },
      ram: { allocated: 8, used: 0.8 },
      storage: { allocated: 120, used: 85.2 },
      ip: "192.168.1.103",
      tags: ["dev", "windows"],
      host: "node-01",
    },
    {
      id: "vm-4",
      name: "test-server-01",
      os: "Debian 11",
      status: "stopped", 
      cpu: { allocated: 2, used: 0 },
      ram: { allocated: 4, used: 0 },
      storage: { allocated: 40, used: 18.4 },
      ip: "192.168.1.104",
      tags: ["test"],
      host: "node-03",
    },
    {
      id: "vm-5",
      name: "backup-server-01",
      os: "Ubuntu 20.04 LTS",
      status: "error", 
      cpu: { allocated: 2, used: 1.8 },
      ram: { allocated: 4, used: 3.6 },
      storage: { allocated: 1000, used: 720.8 },
      ip: "192.168.1.105",
      tags: ["backup"],
      host: "node-02",
    },
    {
      id: "vm-6",
      name: "monitoring-01",
      os: "AlmaLinux 8",
      status: "provisioning", 
      cpu: { allocated: 2, used: 1.2 },
      ram: { allocated: 4, used: 2.8 },
      storage: { allocated: 60, used: 28.4 },
      ip: "192.168.1.106",
      tags: ["monitoring"],
      host: "node-03",
    },
  ];

  // Filter VMs based on search query and active tab
  const filteredVMs = virtualMachines.filter(vm => {
    const matchesSearch = 
      vm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vm.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vm.ip.includes(searchQuery) ||
      vm.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "running") return matchesSearch && vm.status === "running";
    if (activeTab === "stopped") return matchesSearch && (vm.status === "stopped" || vm.status === "paused");
    if (activeTab === "problems") return matchesSearch && vm.status === "error";
    
    return matchesSearch;
  });

  // Stats 
  const stats = {
    all: virtualMachines.length,
    running: virtualMachines.filter(vm => vm.status === "running").length,
    stopped: virtualMachines.filter(vm => vm.status === "stopped" || vm.status === "paused").length,
    problems: virtualMachines.filter(vm => vm.status === "error").length
  };

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
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard 
                  title="All VMs" 
                  value={stats.all}
                  active={activeTab === "all"}
                  onClick={() => setActiveTab("all")}
                />
                <StatCard 
                  title="Running" 
                  value={stats.running} 
                  status="running"
                  active={activeTab === "running"}
                  onClick={() => setActiveTab("running")}
                />
                <StatCard 
                  title="Stopped" 
                  value={stats.stopped} 
                  status="stopped"
                  active={activeTab === "stopped"}
                  onClick={() => setActiveTab("stopped")}
                />
                <StatCard 
                  title="Problems" 
                  value={stats.problems} 
                  status="error"
                  active={activeTab === "problems"}
                  onClick={() => setActiveTab("problems")}
                />
              </div>
              
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search virtual machines..."
                    className="w-full pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All VMs</TabsTrigger>
                  <TabsTrigger value="running">Running</TabsTrigger>
                  <TabsTrigger value="stopped">Stopped</TabsTrigger>
                  <TabsTrigger value="problems">Problems</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="space-y-4">
                  {filteredVMs.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {filteredVMs.map((vm) => (
                        <VirtualMachineCard key={vm.id} {...vm} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No virtual machines found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try changing your search criteria or create a new virtual machine
                      </p>
                      <Button className="mt-4 gap-1">
                        <Plus className="h-4 w-4" />
                        <span>Create VM</span>
                      </Button>
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

interface StatCardProps {
  title: string;
  value: number;
  status?: "running" | "stopped" | "error";
  active: boolean;
  onClick: () => void;
}

const StatCard = ({ title, value, status, active, onClick }: StatCardProps) => {
  let statusColor = "";
  let icon = null;
  
  switch(status) {
    case "running":
      statusColor = "text-green-500";
      icon = <Play className="h-4 w-4" />;
      break;
    case "stopped":
      statusColor = "text-amber-500";
      icon = <StopCircle className="h-4 w-4" />;
      break;
    case "error":
      statusColor = "text-red-500";
      icon = <Trash2 className="h-4 w-4" />;
      break;
    default:
      statusColor = "text-sky-500";
      icon = <Monitor className="h-4 w-4" />;
  }
  
  return (
    <Card 
      className={`cursor-pointer transition-colors ${active ? 'border-primary/50 bg-primary/5' : 'hover:bg-muted/50'}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-1.5 text-muted-foreground">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${statusColor}`}>{value}</div>
      </CardContent>
    </Card>
  );
};

export default VirtualMachines;
