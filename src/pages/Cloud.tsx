
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Cloud, 
  Server, 
  Database, 
  Globe, 
  Settings, 
  Plus, 
  RefreshCw,
  Layers,
  Activity,
  CreditCard,
} from "lucide-react";

const CloudPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <Sidebar collapsed={collapsed} />
        <main className={cn(
          "flex-1 overflow-y-auto h-[calc(100vh-4rem)]",
          collapsed ? "ml-[4.5rem]" : "ml-64"
        )}>
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    <Cloud className="h-6 w-6" />
                    Rudimental Cloud Platform
                  </h1>
                  <p className="text-muted-foreground">
                    Manage cloud resources across regions
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Create Resource</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="compute">Compute</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="networking">Networking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <UsageMetricCard 
                      title="Compute Usage" 
                      value={68} 
                      description="vCPUs, Memory, GPUs" 
                      icon={Server}
                    />
                    <UsageMetricCard 
                      title="Storage Usage" 
                      value={42} 
                      description="Block, Object, File" 
                      icon={Database}
                    />
                    <UsageMetricCard 
                      title="Network Usage" 
                      value={55} 
                      description="VPC, VPN, Load Balancers" 
                      icon={Globe}
                    />
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <RegionUsageCard />
                    <StackSummaryCard />
                  </div>
                  
                  <ServiceStatusCard />
                </TabsContent>
                
                <TabsContent value="compute" className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <ComputeInstanceCard
                      name="web-server-01"
                      type="t3.medium"
                      status="running"
                      region="us-east-1"
                      uptime="42 days"
                      cpu={62}
                      memory={48}
                    />
                    <ComputeInstanceCard
                      name="api-server-01"
                      type="c5.large"
                      status="running"
                      region="us-east-1"
                      uptime="38 days"
                      cpu={78}
                      memory={56}
                    />
                    <ComputeInstanceCard
                      name="db-replica-02"
                      type="r5.xlarge"
                      status="stopped"
                      region="eu-west-1"
                      uptime="0 days"
                      cpu={0}
                      memory={0}
                    />
                    <ComputeInstanceCard
                      name="worker-01"
                      type="t3.small"
                      status="running"
                      region="us-west-2"
                      uptime="15 days"
                      cpu={23}
                      memory={37}
                    />
                    <ComputeInstanceCard
                      name="cache-server-01"
                      type="t3.medium"
                      status="running"
                      region="ap-southeast-1"
                      uptime="21 days"
                      cpu={41}
                      memory={76}
                    />
                    <div className="flex items-center justify-center h-full">
                      <Button variant="outline" className="border-dashed w-full h-full py-8 flex flex-col gap-2 text-muted-foreground">
                        <Plus className="h-8 w-8" />
                        <span>Add New Instance</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="storage" className="space-y-4">
                  <StorageOverview />
                </TabsContent>
                
                <TabsContent value="database" className="space-y-4">
                  <DatabaseServices />
                </TabsContent>
                
                <TabsContent value="networking" className="space-y-4">
                  <NetworkingOverview />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

const UsageMetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Current Usage</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const RegionUsageCard = () => {
  const regions = [
    { name: "US East (N. Virginia)", code: "us-east-1", usage: 78 },
    { name: "US West (Oregon)", code: "us-west-2", usage: 42 },
    { name: "EU West (Ireland)", code: "eu-west-1", usage: 56 },
    { name: "Asia Pacific (Tokyo)", code: "ap-northeast-1", usage: 35 },
    { name: "Asia Pacific (Singapore)", code: "ap-southeast-1", usage: 23 },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Region Usage</CardTitle>
        <CardDescription>Resource utilization across regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regions.map(region => (
            <div key={region.code}>
              <div className="flex justify-between text-sm mb-1">
                <span>{region.name}</span>
                <span>{region.usage}%</span>
              </div>
              <Progress value={region.usage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const StackSummaryCard = () => {
  const stacks = [
    { name: "Web Tier", instances: 8, status: "healthy" },
    { name: "Application Tier", instances: 12, status: "warning" },
    { name: "Database Tier", instances: 6, status: "healthy" },
    { name: "Analytics Stack", instances: 4, status: "healthy" },
    { name: "Cache Layer", instances: 3, status: "degraded" },
  ];
  
  const statusColors = {
    healthy: "bg-green-500/20 text-green-700",
    warning: "bg-amber-500/20 text-amber-700",
    degraded: "bg-red-500/20 text-red-700",
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stack Summary</CardTitle>
        <CardDescription>Application stacks and services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stacks.map((stack, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
              <div>
                <div className="font-medium">{stack.name}</div>
                <div className="text-sm text-muted-foreground">{stack.instances} instances</div>
              </div>
              <Badge className={statusColors[stack.status as keyof typeof statusColors]}>
                {stack.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Layers className="h-4 w-4 mr-2" />
          Manage Stacks
        </Button>
      </CardFooter>
    </Card>
  );
};

const ServiceStatusCard = () => {
  const services = [
    { name: "Compute Engine", status: "operational", uptime: "99.99%" },
    { name: "Object Storage", status: "operational", uptime: "99.98%" },
    { name: "Managed Database", status: "operational", uptime: "99.97%" },
    { name: "Load Balancing", status: "incident", uptime: "99.82%" },
    { name: "Content Delivery", status: "operational", uptime: "99.95%" },
    { name: "Kubernetes Engine", status: "operational", uptime: "99.96%" },
    { name: "Machine Learning", status: "maintenance", uptime: "99.90%" },
    { name: "API Gateway", status: "operational", uptime: "99.93%" },
  ];
  
  const statusColors = {
    operational: "bg-green-500/20 text-green-700",
    maintenance: "bg-amber-500/20 text-amber-700",
    incident: "bg-red-500/20 text-red-700",
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Service Status</CardTitle>
          <CardDescription>Current status of cloud services</CardDescription>
        </div>
        <Activity className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  service.status === "operational" ? "bg-green-500" : 
                  service.status === "maintenance" ? "bg-amber-500" : "bg-red-500"
                )}/>
                <span>{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{service.uptime}</span>
                <Badge className={statusColors[service.status as keyof typeof statusColors]}>
                  {service.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Service Health Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

const ComputeInstanceCard = ({
  name,
  type,
  status,
  region,
  uptime,
  cpu,
  memory
}: {
  name: string;
  type: string;
  status: "running" | "stopped" | "terminated";
  region: string;
  uptime: string;
  cpu: number;
  memory: number;
}) => {
  const statusColors = {
    running: "bg-green-500/20 text-green-700",
    stopped: "bg-amber-500/20 text-amber-700",
    terminated: "bg-red-500/20 text-red-700"
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        <div className="text-muted-foreground text-sm flex items-center gap-1">
          <Server className="h-3 w-3" /> {type}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Region</div>
              <div className="font-medium">{region}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Uptime</div>
              <div className="font-medium">{uptime}</div>
            </div>
          </div>
          
          {status === "running" && (
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1 text-xs">
                  <span>CPU</span>
                  <span>{cpu}%</span>
                </div>
                <Progress value={cpu} className="h-1" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-xs">
                  <span>Memory</span>
                  <span>{memory}%</span>
                </div>
                <Progress value={memory} className="h-1" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {status === "running" ? (
          <Button variant="outline" size="sm" className="w-full">Stop</Button>
        ) : (
          <Button size="sm" className="w-full">Start</Button>
        )}
        <Button variant="outline" size="sm" className="w-auto px-2">
          <Settings className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const StorageOverview = () => {
  const storageTypes = [
    {
      name: "Block Storage",
      volumes: 24,
      totalSize: "8.2 TB",
      allocated: 68,
      types: [
        { name: "SSD", count: 16, size: "5.4 TB" },
        { name: "HDD", count: 8, size: "2.8 TB" }
      ]
    },
    {
      name: "Object Storage",
      buckets: 12,
      totalSize: "45.7 TB",
      allocated: 42,
      regions: [
        { name: "us-east-1", size: "28.3 TB" },
        { name: "eu-west-1", size: "12.1 TB" },
        { name: "ap-southeast-1", size: "5.3 TB" }
      ]
    },
    {
      name: "File Storage",
      shares: 6,
      totalSize: "3.4 TB",
      allocated: 56,
      types: [
        { name: "NFS", count: 4, size: "2.7 TB" },
        { name: "SMB", count: 2, size: "0.7 TB" }
      ]
    }
  ];
  
  return (
    <div className="grid gap-6 grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Storage Overview</CardTitle>
          <CardDescription>Manage your cloud storage resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {storageTypes.map((storage, index) => (
              <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{storage.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {storage.volumes && `${storage.volumes} volumes`}
                      {storage.buckets && `${storage.buckets} buckets`}
                      {storage.shares && `${storage.shares} shares`}
                      {" · "}{storage.totalSize}
                    </p>
                  </div>
                  <Button variant="outline" className="mt-2 md:mt-0">
                    Manage
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Allocated</span>
                    <span>{storage.allocated}%</span>
                  </div>
                  <Progress value={storage.allocated} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {storage.types && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Storage Types</h4>
                      <div className="space-y-2">
                        {storage.types.map((type, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{type.name} ({type.count})</span>
                            <span>{type.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {storage.regions && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Regions</h4>
                      <div className="space-y-2">
                        {storage.regions.map((region, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{region.name}</span>
                            <span>{region.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create New Storage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const DatabaseServices = () => {
  const databases = [
    {
      name: "production-db-01",
      type: "PostgreSQL",
      status: "healthy",
      size: "xlarge",
      storage: "500 GB",
      connections: 284,
      region: "us-east-1"
    },
    {
      name: "analytics-db-01",
      type: "MySQL",
      status: "maintenance",
      size: "2xlarge",
      storage: "1 TB",
      connections: 156,
      region: "us-west-2"
    },
    {
      name: "reporting-db-01",
      type: "MariaDB",
      status: "healthy",
      size: "large",
      storage: "250 GB",
      connections: 95,
      region: "eu-west-1"
    },
    {
      name: "cache-db-01",
      type: "Redis",
      status: "healthy",
      size: "medium",
      storage: "100 GB",
      connections: 428,
      region: "us-east-1"
    },
    {
      name: "document-db-01",
      type: "MongoDB",
      status: "degraded",
      size: "large",
      storage: "500 GB",
      connections: 142,
      region: "ap-southeast-1"
    }
  ];
  
  const statusColors = {
    healthy: "bg-green-500/20 text-green-700",
    maintenance: "bg-amber-500/20 text-amber-700",
    degraded: "bg-red-500/20 text-red-700"
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Managed Database Services</CardTitle>
        <CardDescription>Database instances and clusters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Size</th>
                <th className="text-left py-3 px-4 font-medium">Storage</th>
                <th className="text-left py-3 px-4 font-medium">Connections</th>
                <th className="text-left py-3 px-4 font-medium">Region</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {databases.map((db, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{db.name}</td>
                  <td className="py-3 px-4">{db.type}</td>
                  <td className="py-3 px-4">
                    <Badge className={statusColors[db.status as keyof typeof statusColors]}>
                      {db.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{db.size}</td>
                  <td className="py-3 px-4">{db.storage}</td>
                  <td className="py-3 px-4">{db.connections}</td>
                  <td className="py-3 px-4">{db.region}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Metrics</Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Database
        </Button>
      </CardFooter>
    </Card>
  );
};

const NetworkingOverview = () => {
  const networks = [
    {
      name: "Production VPC",
      type: "VPC",
      region: "us-east-1",
      cidr: "10.0.0.0/16",
      subnets: 8,
      instances: 24,
      status: "active"
    },
    {
      name: "Staging VPC",
      type: "VPC",
      region: "us-east-1",
      cidr: "10.1.0.0/16",
      subnets: 4,
      instances: 12,
      status: "active"
    }
  ];
  
  const services = [
    {
      name: "prod-lb-01",
      type: "Load Balancer",
      region: "us-east-1",
      instances: 8,
      status: "active"
    },
    {
      name: "vpn-gateway-01",
      type: "VPN Gateway",
      region: "us-east-1",
      connections: 3,
      status: "active"
    },
    {
      name: "nat-gateway-01",
      type: "NAT Gateway",
      region: "us-east-1",
      subnets: 4,
      status: "active"
    },
    {
      name: "transit-gateway-01",
      type: "Transit Gateway",
      region: "Global",
      connections: 5,
      status: "active"
    }
  ];
  
  return (
    <div className="grid gap-6 grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Virtual Private Clouds</CardTitle>
          <CardDescription>Private network environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networks.map((network, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{network.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {network.cidr} · {network.region}
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0">
                    {network.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Subnets</div>
                    <div className="font-medium">{network.subnets}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Instances</div>
                    <div className="font-medium">{network.instances}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Type</div>
                    <div className="font-medium">{network.type}</div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create New VPC
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Network Services</CardTitle>
          <CardDescription>Load balancers, gateways, and more</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.type} · {service.region}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {service.status}
                  </Badge>
                </div>
                
                <div className="mt-4 text-sm">
                  {service.instances && (
                    <div className="flex justify-between">
                      <span>Connected instances</span>
                      <span>{service.instances}</span>
                    </div>
                  )}
                  {service.connections && (
                    <div className="flex justify-between">
                      <span>Active connections</span>
                      <span>{service.connections}</span>
                    </div>
                  )}
                  {service.subnets && (
                    <div className="flex justify-between">
                      <span>Associated subnets</span>
                      <span>{service.subnets}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            IP Addresses
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CloudPage;
