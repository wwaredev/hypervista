
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { MapPin, Activity, Server, ArrowUpDown, Globe, Wifi } from "lucide-react";

interface DatacenterProps {
  id: string;
  name: string;
  location: string;
  region: string;
  status: "active" | "maintenance" | "degraded";
  utilization: number;
  hyperconvergence: string[];
  metrics: {
    uptime: string;
    latency: string;
    availability: string;
  };
  connections: {
    id: string;
    name: string;
  }[];
}

const datacenters: DatacenterProps[] = [
  {
    id: "dc-us-east-1",
    name: "US East Primary",
    location: "Virginia, USA",
    region: "US East (N. Virginia)",
    status: "active",
    utilization: 78,
    hyperconvergence: ["Storage Cluster", "Compute Grid", "Network Fabric"],
    metrics: {
      uptime: "99.998%",
      latency: "4.2ms",
      availability: "99.99%"
    },
    connections: [
      { id: "dc-us-west-1", name: "US West Primary" },
      { id: "dc-eu-west-1", name: "EU West Primary" }
    ]
  },
  {
    id: "dc-us-west-1",
    name: "US West Primary",
    location: "Oregon, USA",
    region: "US West (Oregon)",
    status: "active",
    utilization: 62,
    hyperconvergence: ["Storage Cluster", "Compute Grid"],
    metrics: {
      uptime: "99.995%",
      latency: "5.1ms",
      availability: "99.98%"
    },
    connections: [
      { id: "dc-us-east-1", name: "US East Primary" },
      { id: "dc-ap-southeast-1", name: "APAC Southeast" }
    ]
  },
  {
    id: "dc-eu-west-1",
    name: "EU West Primary",
    location: "Dublin, Ireland",
    region: "EU West (Ireland)",
    status: "active",
    utilization: 71,
    hyperconvergence: ["Storage Cluster", "Network Fabric"],
    metrics: {
      uptime: "99.996%",
      latency: "4.8ms",
      availability: "99.99%"
    },
    connections: [
      { id: "dc-us-east-1", name: "US East Primary" },
      { id: "dc-eu-central-1", name: "EU Central" }
    ]
  },
  {
    id: "dc-eu-central-1",
    name: "EU Central",
    location: "Frankfurt, Germany",
    region: "EU Central (Frankfurt)",
    status: "maintenance",
    utilization: 43,
    hyperconvergence: ["Compute Grid", "Network Fabric"],
    metrics: {
      uptime: "99.982%",
      latency: "5.2ms",
      availability: "99.95%"
    },
    connections: [
      { id: "dc-eu-west-1", name: "EU West Primary" }
    ]
  },
  {
    id: "dc-ap-southeast-1",
    name: "APAC Southeast",
    location: "Singapore",
    region: "APAC Southeast (Singapore)",
    status: "degraded",
    utilization: 86,
    hyperconvergence: ["Storage Cluster"],
    metrics: {
      uptime: "99.975%",
      latency: "7.3ms",
      availability: "99.90%"
    },
    connections: [
      { id: "dc-us-west-1", name: "US West Primary" },
      { id: "dc-ap-northeast-1", name: "APAC Northeast" }
    ]
  },
  {
    id: "dc-ap-northeast-1",
    name: "APAC Northeast",
    location: "Tokyo, Japan",
    region: "APAC Northeast (Tokyo)",
    status: "active",
    utilization: 67,
    hyperconvergence: ["Storage Cluster", "Compute Grid", "Network Fabric"],
    metrics: {
      uptime: "99.994%",
      latency: "6.1ms",
      availability: "99.97%"
    },
    connections: [
      { id: "dc-ap-southeast-1", name: "APAC Southeast" }
    ]
  }
];

const Locations = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("datacenters");
  
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
                    <MapPin className="h-6 w-6" />
                    DC Locations
                  </h1>
                  <p className="text-muted-foreground">
                    Global datacenter locations and infrastructure
                  </p>
                </div>
              </div>
              
              <Tabs defaultValue="datacenters" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="datacenters">Datacenters</TabsTrigger>
                  <TabsTrigger value="regions">Regions</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="connections">Connections</TabsTrigger>
                </TabsList>
                
                <TabsContent value="datacenters" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {datacenters.map((dc) => (
                      <DatacenterCard key={dc.id} datacenter={dc} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="regions" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <RegionMap />
                    <RegionsList datacenters={datacenters} />
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    <MetricCard 
                      title="Global Uptime" 
                      value="99.994%" 
                      description="Average across all datacenters" 
                      icon={Activity}
                    />
                    <MetricCard 
                      title="Average Latency" 
                      value="5.4ms" 
                      description="Inter-datacenter communication" 
                      icon={ArrowUpDown}
                    />
                    <MetricCard 
                      title="Availability" 
                      value="99.98%" 
                      description="Service level achievement" 
                      icon={Server}
                    />
                  </div>
                  <div className="grid gap-6 grid-cols-1">
                    <DatacenterMetricsTable datacenters={datacenters} />
                  </div>
                </TabsContent>
                
                <TabsContent value="connections" className="space-y-4">
                  <ConnectionsMap datacenters={datacenters} />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

const DatacenterCard = ({ datacenter }: { datacenter: DatacenterProps }) => {
  const statusColors = {
    active: "bg-green-500/20 text-green-700",
    maintenance: "bg-amber-500/20 text-amber-700",
    degraded: "bg-red-500/20 text-red-700"
  };
  
  const statusText = {
    active: "Active",
    maintenance: "Maintenance",
    degraded: "Degraded"
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{datacenter.name}</CardTitle>
          <Badge className={statusColors[datacenter.status]}>
            {statusText[datacenter.status]}
          </Badge>
        </div>
        <div className="text-muted-foreground text-sm flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {datacenter.location}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Utilization</span>
              <span>{datacenter.utilization}%</span>
            </div>
            <Progress value={datacenter.utilization} className="h-2" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Hyperconvergence</h4>
            <div className="flex flex-wrap gap-2">
              {datacenter.hyperconvergence.map((item, index) => (
                <Badge key={index} variant="outline" className="bg-hyperblue-50 text-hyperblue-700 border-hyperblue-200">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Uptime</div>
              <div className="font-medium">{datacenter.metrics.uptime}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Latency</div>
              <div className="font-medium">{datacenter.metrics.latency}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Availability</div>
              <div className="font-medium">{datacenter.metrics.availability}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RegionMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Regions</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Globe className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p>Interactive region map visualization</p>
          <p className="text-sm">(World map with datacenter locations)</p>
        </div>
      </CardContent>
    </Card>
  );
};

const RegionsList = ({ datacenters }: { datacenters: DatacenterProps[] }) => {
  // Group datacenters by region
  const regions = datacenters.reduce((acc, dc) => {
    if (!acc[dc.region]) {
      acc[dc.region] = [];
    }
    acc[dc.region].push(dc);
    return acc;
  }, {} as Record<string, DatacenterProps[]>);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regions & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(regions).map(([regionName, dcs]) => (
            <div key={regionName} className="pb-3 border-b last:border-0 last:pb-0">
              <h3 className="font-medium mb-2">{regionName}</h3>
              <div className="space-y-2">
                {dcs.map(dc => (
                  <div key={dc.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        dc.status === "active" ? "bg-green-500" :
                        dc.status === "maintenance" ? "bg-amber-500" : "bg-red-500"
                      )} />
                      <span>{dc.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {dc.metrics.availability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string;
  value: string;
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
        <div className="text-3xl font-bold mb-1">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const DatacenterMetricsTable = ({ datacenters }: { datacenters: DatacenterProps[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Datacenter Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Datacenter</th>
                <th className="text-left py-3 px-4 font-medium">Region</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Uptime</th>
                <th className="text-left py-3 px-4 font-medium">Latency</th>
                <th className="text-left py-3 px-4 font-medium">Availability</th>
                <th className="text-left py-3 px-4 font-medium">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {datacenters.map(dc => (
                <tr key={dc.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4">{dc.name}</td>
                  <td className="py-3 px-4">{dc.region}</td>
                  <td className="py-3 px-4">
                    <Badge className={cn(
                      dc.status === "active" ? "bg-green-500/20 text-green-700" :
                      dc.status === "maintenance" ? "bg-amber-500/20 text-amber-700" : 
                      "bg-red-500/20 text-red-700"
                    )}>
                      {dc.status === "active" ? "Active" : 
                       dc.status === "maintenance" ? "Maintenance" : "Degraded"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{dc.metrics.uptime}</td>
                  <td className="py-3 px-4">{dc.metrics.latency}</td>
                  <td className="py-3 px-4">{dc.metrics.availability}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={dc.utilization} className="h-2 w-24" />
                      <span>{dc.utilization}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const ConnectionsMap = ({ datacenters }: { datacenters: DatacenterProps[] }) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Datacenter Connections</CardTitle>
      </CardHeader>
      <CardContent className="h-[500px] relative flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Wifi className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p>Interactive connections visualization</p>
          <p className="text-sm">(Network map showing connections between datacenters)</p>
          <div className="max-w-xl mx-auto mt-8">
            <h3 className="font-medium mb-2">Connection Summary</h3>
            <div className="space-y-2">
              {datacenters.map(dc => (
                <div key={dc.id} className="p-2 border rounded-md">
                  <div className="font-medium">{dc.name}</div>
                  <div className="text-sm text-muted-foreground">Connected to:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dc.connections.map(conn => (
                      <Badge key={conn.id} variant="outline">{conn.name}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Locations;
