
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { VirtualMachineCard } from "@/components/VirtualMachineCard";

// Define types for virtual machines
type VMStatus = "running" | "stopped" | "paused" | "error" | "provisioning";

interface VirtualMachine {
  id: string;
  name: string;
  os: string;
  status: VMStatus;
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
  tags: string[];
  host: string;
}

const VirtualMachines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Sample VM data
  const virtualMachines: VirtualMachine[] = [
    {
      id: "vm-1",
      name: "Web Server",
      os: "Ubuntu 22.04 LTS",
      status: "running",
      cpu: { allocated: 4, used: 2.3 },
      ram: { allocated: 8, used: 5.2 },
      storage: { allocated: 100, used: 42 },
      ip: "192.168.1.100",
      tags: ["production", "web"],
      host: "host-1",
    },
    {
      id: "vm-2",
      name: "Database Server",
      os: "CentOS 8",
      status: "running",
      cpu: { allocated: 8, used: 5.6 },
      ram: { allocated: 32, used: 24.8 },
      storage: { allocated: 500, used: 320 },
      ip: "192.168.1.101",
      tags: ["production", "database"],
      host: "host-2",
    },
    {
      id: "vm-3",
      name: "Development VM",
      os: "Windows Server 2022",
      status: "stopped",
      cpu: { allocated: 4, used: 0 },
      ram: { allocated: 16, used: 0 },
      storage: { allocated: 250, used: 98 },
      ip: "192.168.1.102",
      tags: ["development", "windows"],
      host: "host-1",
    },
    {
      id: "vm-4",
      name: "Test Environment",
      os: "Debian 11",
      status: "paused",
      cpu: { allocated: 2, used: 0.1 },
      ram: { allocated: 4, used: 3.1 },
      storage: { allocated: 80, used: 45 },
      ip: "192.168.1.103",
      tags: ["test", "staging"],
      host: "host-3",
    },
    {
      id: "vm-5",
      name: "CI/CD Server",
      os: "Ubuntu 20.04 LTS",
      status: "running",
      cpu: { allocated: 4, used: 3.1 },
      ram: { allocated: 16, used: 12.3 },
      storage: { allocated: 120, used: 78 },
      ip: "192.168.1.104",
      tags: ["devops", "ci-cd"],
      host: "host-2",
    },
    {
      id: "vm-6",
      name: "Legacy App Server",
      os: "CentOS 7",
      status: "error",
      cpu: { allocated: 2, used: 0 },
      ram: { allocated: 4, used: 0 },
      storage: { allocated: 60, used: 45 },
      ip: "192.168.1.105",
      tags: ["legacy", "maintenance"],
      host: "host-3",
    },
    {
      id: "vm-7",
      name: "Analytics Platform",
      os: "Ubuntu 22.04 LTS",
      status: "running",
      cpu: { allocated: 8, used: 6.5 },
      ram: { allocated: 64, used: 48 },
      storage: { allocated: 1000, used: 680 },
      ip: "192.168.1.106",
      tags: ["analytics", "production"],
      host: "host-1",
    },
    {
      id: "vm-8",
      name: "Staging Environment",
      os: "Debian 11",
      status: "running",
      cpu: { allocated: 4, used: 1.2 },
      ram: { allocated: 8, used: 4.5 },
      storage: { allocated: 120, used: 65 },
      ip: "192.168.1.107",
      tags: ["staging", "testing"],
      host: "host-2",
    },
    {
      id: "vm-9",
      name: "Internal Tools",
      os: "Ubuntu 20.04 LTS",
      status: "running",
      cpu: { allocated: 2, used: 0.8 },
      ram: { allocated: 4, used: 2.1 },
      storage: { allocated: 80, used: 35 },
      ip: "192.168.1.108",
      tags: ["internal", "tools"],
      host: "host-3",
    },
    {
      id: "vm-10",
      name: "New Deployment",
      os: "Rocky Linux 8",
      status: "provisioning",
      cpu: { allocated: 4, used: 0.2 },
      ram: { allocated: 8, used: 1.5 },
      storage: { allocated: 100, used: 15 },
      ip: "192.168.1.109",
      tags: ["deployment", "new"],
      host: "host-1",
    },
    {
      id: "vm-11",
      name: "Backup Server",
      os: "Ubuntu 22.04 LTS",
      status: "running",
      cpu: { allocated: 2, used: 0.5 },
      ram: { allocated: 8, used: 4.2 },
      storage: { allocated: 2000, used: 1450 },
      ip: "192.168.1.110",
      tags: ["backup", "storage"],
      host: "host-2",
    },
    {
      id: "vm-12",
      name: "Development Workstation",
      os: "Windows 11 Enterprise",
      status: "paused",
      cpu: { allocated: 8, used: 0.1 },
      ram: { allocated: 32, used: 4.8 },
      storage: { allocated: 500, used: 220 },
      ip: "192.168.1.111",
      tags: ["development", "windows"],
      host: "host-3",
    },
  ];

  // Filter VMs based on search term and selected tab
  const filteredVMs = virtualMachines.filter((vm) => {
    const matchesSearch = vm.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vm.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vm.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "running") return matchesSearch && vm.status === "running";
    if (selectedTab === "stopped") return matchesSearch && vm.status === "stopped";
    if (selectedTab === "paused") return matchesSearch && vm.status === "paused";
    if (selectedTab === "error") return matchesSearch && vm.status === "error";
    if (selectedTab === "provisioning") return matchesSearch && vm.status === "provisioning";
    
    return false;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Virtual Machines</h1>
                <p className="text-muted-foreground">Manage and monitor your virtual machines</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New VM
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all">All VMs ({virtualMachines.length})</TabsTrigger>
                  <TabsTrigger value="running">Running ({virtualMachines.filter(vm => vm.status === "running").length})</TabsTrigger>
                  <TabsTrigger value="stopped">Stopped ({virtualMachines.filter(vm => vm.status === "stopped").length})</TabsTrigger>
                  <TabsTrigger value="paused">Paused ({virtualMachines.filter(vm => vm.status === "paused").length})</TabsTrigger>
                  <TabsTrigger value="error">Error ({virtualMachines.filter(vm => vm.status === "error").length})</TabsTrigger>
                  <TabsTrigger value="provisioning">Provisioning ({virtualMachines.filter(vm => vm.status === "provisioning").length})</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search virtual machines..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setSearchTerm("production")}>
                    Production
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSearchTerm("development")}>
                    Development
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSearchTerm("staging")}>
                    Staging
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSearchTerm("test")}>
                    Test
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    View
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Table view
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Card view
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Host</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVMs.map((vm) => (
                      <TableRow key={vm.id}>
                        <TableCell className="font-medium">{vm.name}</TableCell>
                        <TableCell>
                          <StatusBadge status={vm.status} />
                        </TableCell>
                        <TableCell>{vm.os}</TableCell>
                        <TableCell>{vm.host}</TableCell>
                        <TableCell>{vm.ip || "—"}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vm.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="running" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVMs.map((vm) => (
                  <VirtualMachineCard
                    key={vm.id}
                    id={vm.id}
                    name={vm.name}
                    os={vm.os}
                    status={vm.status}
                    cpu={vm.cpu}
                    ram={vm.ram}
                    storage={vm.storage}
                    ip={vm.ip}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="stopped" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVMs.map((vm) => (
                  <VirtualMachineCard
                    key={vm.id}
                    id={vm.id}
                    name={vm.name}
                    os={vm.os}
                    status={vm.status}
                    cpu={vm.cpu}
                    ram={vm.ram}
                    storage={vm.storage}
                    ip={vm.ip}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="paused" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVMs.map((vm) => (
                  <VirtualMachineCard
                    key={vm.id}
                    id={vm.id}
                    name={vm.name}
                    os={vm.os}
                    status={vm.status}
                    cpu={vm.cpu}
                    ram={vm.ram}
                    storage={vm.storage}
                    ip={vm.ip}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="error" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVMs.map((vm) => (
                  <VirtualMachineCard
                    key={vm.id}
                    id={vm.id}
                    name={vm.name}
                    os={vm.os}
                    status={vm.status}
                    cpu={vm.cpu}
                    ram={vm.ram}
                    storage={vm.storage}
                    ip={vm.ip}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="provisioning" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVMs.map((vm) => (
                  <VirtualMachineCard
                    key={vm.id}
                    id={vm.id}
                    name={vm.name}
                    os={vm.os}
                    status={vm.status}
                    cpu={vm.cpu}
                    ram={vm.ram}
                    storage={vm.storage}
                    ip={vm.ip}
                  />
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
