
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitBranch, Plus, Search, Filter, RefreshCw, Server, Database, HardDrive, Network } from "lucide-react";
import { Input } from "@/components/ui/input";

const HCI = () => {
  const [activeTab, setActiveTab] = useState("nodes");
  
  // Mock HCI nodes data
  const hciNodes = [
    {
      id: "node-1",
      name: "hci-node-01",
      status: "healthy",
      cpu: { total: 64, used: 42 },
      memory: { total: 512, used: 318 },
      storage: { total: 24, used: 14.2 },
      network: { bandwidth: 40, utilization: 12.8 },
      services: ["compute", "storage", "network"],
    },
    {
      id: "node-2",
      name: "hci-node-02",
      status: "healthy",
      cpu: { total: 64, used: 38 },
      memory: { total: 512, used: 286 },
      storage: { total: 24, used: 16.7 },
      network: { bandwidth: 40, utilization: 15.6 },
      services: ["compute", "storage", "network"],
    },
    {
      id: "node-3",
      name: "hci-node-03",
      status: "warning",
      cpu: { total: 64, used: 55 },
      memory: { total: 512, used: 476 },
      storage: { total: 24, used: 22.8 },
      network: { bandwidth: 40, utilization: 28.4 },
      services: ["compute", "storage", "network"],
    },
    {
      id: "node-4",
      name: "hci-node-04",
      status: "maintenance",
      cpu: { total: 64, used: 0 },
      memory: { total: 512, used: 0 },
      storage: { total: 24, used: 8.4 },
      network: { bandwidth: 40, utilization: 0.2 },
      services: ["storage"],
    },
  ];
  
  // Mock HCI storage pools data
  const hciStoragePools = [
    {
      id: "pool-1",
      name: "SSD Tier",
      type: "All Flash",
      capacity: 48,
      used: 31.2,
      replicas: 3,
      status: "healthy",
      performance: "high",
      encryption: true,
    },
    {
      id: "pool-2",
      name: "Hybrid Tier",
      type: "Hybrid",
      capacity: 96,
      used: 42.8,
      replicas: 2,
      status: "healthy",
      performance: "medium",
      encryption: true,
    },
    {
      id: "pool-3",
      name: "Archive Tier",
      type: "HDD",
      capacity: 240,
      used: 198.4,
      replicas: 2,
      status: "warning",
      performance: "low",
      encryption: false,
    },
  ];

  // Mock HCI services data
  const hciServices = [
    {
      id: "service-1",
      name: "Compute Virtualization",
      status: "running",
      nodes: 4,
      highAvailability: true,
      lastRestart: "28 days ago",
    },
    {
      id: "service-2",
      name: "Storage Virtualization",
      status: "running",
      nodes: 4,
      highAvailability: true,
      lastRestart: "28 days ago",
    },
    {
      id: "service-3",
      name: "Network Virtualization",
      status: "running",
      nodes: 3,
      highAvailability: true,
      lastRestart: "14 days ago",
    },
    {
      id: "service-4",
      name: "Management Cluster",
      status: "running",
      nodes: 3,
      highAvailability: true,
      lastRestart: "28 days ago",
    },
    {
      id: "service-5",
      name: "Container Service",
      status: "stopped",
      nodes: 0,
      highAvailability: false,
      lastRestart: "N/A",
    },
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
                    <GitBranch className="h-6 w-6" />
                    Hyperconverged Infrastructure
                  </h1>
                  <p className="text-muted-foreground">
                    Manage compute, storage, and network resources in a unified platform
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Add Node</span>
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
                    placeholder="Search nodes, pools, services..."
                    className="w-full pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="nodes" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="nodes">Nodes</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>
                
                <TabsContent value="nodes" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {hciNodes.map((node) => (
                      <NodeCard key={node.id} node={node} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="storage" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    {hciStoragePools.map((pool) => (
                      <StoragePoolCard key={pool.id} pool={pool} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {hciServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

interface NodeProps {
  node: {
    id: string;
    name: string;
    status: string;
    cpu: { total: number; used: number };
    memory: { total: number; used: number };
    storage: { total: number; used: number };
    network: { bandwidth: number; utilization: number };
    services: string[];
  };
}

const NodeCard = ({ node }: NodeProps) => {
  const statusVariant = 
    node.status === "healthy" ? "outline" : 
    node.status === "warning" ? "secondary" : "destructive";
  
  const statusColor = 
    node.status === "healthy" ? "bg-green-50 text-green-700 border-green-200" : 
    node.status === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" : "";
  
  const cpuPercentage = Math.round((node.cpu.used / node.cpu.total) * 100);
  const memoryPercentage = Math.round((node.memory.used / node.memory.total) * 100);
  const storagePercentage = Math.round((node.storage.used / node.storage.total) * 100);
  const networkPercentage = Math.round((node.network.utilization / node.network.bandwidth) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{node.name}</CardTitle>
          <Badge 
            variant={statusVariant}
            className={statusColor}
          >
            {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">CPU</span>
              <span className="font-medium">{node.cpu.used}/{node.cpu.total} cores</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-hyperblue-500 h-2 rounded-full" 
                style={{ width: `${cpuPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Memory</span>
              <span className="font-medium">{node.memory.used}/{node.memory.total} GB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-hyperblue-500 h-2 rounded-full" 
                style={{ width: `${memoryPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Storage</span>
              <span className="font-medium">{node.storage.used}/{node.storage.total} TB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-hyperblue-500 h-2 rounded-full" 
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Network</span>
              <span className="font-medium">{node.network.utilization}/{node.network.bandwidth} Gbps</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-hyperblue-500 h-2 rounded-full" 
                style={{ width: `${networkPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground mb-1.5">Services</div>
          <div className="flex flex-wrap gap-1.5">
            {node.services.map((service) => (
              <Badge key={service} variant="secondary" className="capitalize">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Manage Node</Button>
      </CardFooter>
    </Card>
  );
};

interface StoragePoolProps {
  pool: {
    id: string;
    name: string;
    type: string;
    capacity: number;
    used: number;
    replicas: number;
    status: string;
    performance: string;
    encryption: boolean;
  };
}

const StoragePoolCard = ({ pool }: StoragePoolProps) => {
  const usagePercentage = Math.round((pool.used / pool.capacity) * 100);
  
  const statusVariant = 
    pool.status === "healthy" ? "outline" : 
    pool.status === "warning" ? "secondary" : "destructive";
  
  const statusColor = 
    pool.status === "healthy" ? "bg-green-50 text-green-700 border-green-200" : 
    pool.status === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" : "";
  
  const performanceColor = 
    pool.performance === "high" ? "text-green-700" : 
    pool.performance === "medium" ? "text-amber-600" : "text-blue-600";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{pool.name}</CardTitle>
            <CardDescription>{pool.type}</CardDescription>
          </div>
          <Badge 
            variant={statusVariant}
            className={statusColor}
          >
            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Usage</span>
            <span className="font-medium">{pool.used}/{pool.capacity} TB ({usagePercentage}%)</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${usagePercentage > 85 ? "bg-red-500" : usagePercentage > 70 ? "bg-amber-500" : "bg-hyperblue-500"}`}
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Replicas</div>
            <div className="font-medium">{pool.replicas}x</div>
          </div>
          <div>
            <div className="text-muted-foreground">Performance</div>
            <div className={`font-medium capitalize ${performanceColor}`}>{pool.performance}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Protection</div>
            <div className="font-medium">{pool.replicas > 1 ? "Redundant" : "None"}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Encryption</div>
            <div className="font-medium">{pool.encryption ? "Enabled" : "Disabled"}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">Manage</Button>
        <Button variant="outline" className="flex-1">Expand</Button>
      </CardFooter>
    </Card>
  );
};

interface ServiceProps {
  service: {
    id: string;
    name: string;
    status: string;
    nodes: number;
    highAvailability: boolean;
    lastRestart: string;
  };
}

const ServiceCard = ({ service }: ServiceProps) => {
  const statusColor = 
    service.status === "running" ? "bg-green-50 text-green-700 border-green-200" : 
    service.status === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" : "";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{service.name}</CardTitle>
          <Badge 
            variant={service.status === "running" ? "outline" : "destructive"}
            className={statusColor}
          >
            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Nodes:</span>
            <span className="font-medium">{service.nodes}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">High Availability:</span>
            <span className="font-medium">{service.highAvailability ? "Enabled" : "Disabled"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Restart:</span>
            <span className="font-medium">{service.lastRestart}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          disabled={service.status !== "running"}
        >
          Configure
        </Button>
        {service.status === "running" ? (
          <Button variant="destructive" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="flex-1" variant="default">
            Start
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HCI;
