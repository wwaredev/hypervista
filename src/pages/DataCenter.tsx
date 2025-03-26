import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Activity, Server } from "lucide-react";

// Define data center types
interface VirtualDataCenter {
  id: string;
  name: string;
  region: string;
  status: "active" | "maintenance" | "offline";
  hyperconvergence: number;
  vms: number;
  storage: number;
  network: string;
  utilization: number;
}

const DataCenter = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Sample data centers
  const virtualDataCenters: VirtualDataCenter[] = [
    { 
      id: "vdc-1", 
      name: "US East VDC", 
      region: "NORTH_AMERICA", 
      status: "active", 
      hyperconvergence: 85, 
      vms: 156, 
      storage: 450, 
      network: "10 Gbps", 
      utilization: 72 
    },
    { 
      id: "vdc-2", 
      name: "US West VDC", 
      region: "NORTH_AMERICA", 
      status: "active", 
      hyperconvergence: 78, 
      vms: 124, 
      storage: 380, 
      network: "10 Gbps", 
      utilization: 65 
    },
    { 
      id: "vdc-3", 
      name: "EU Central VDC", 
      region: "EMEA", 
      status: "active", 
      hyperconvergence: 92, 
      vms: 210, 
      storage: 520, 
      network: "40 Gbps", 
      utilization: 83 
    },
    { 
      id: "vdc-4", 
      name: "APAC VDC", 
      region: "ASIA", 
      status: "active", 
      hyperconvergence: 75, 
      vms: 98, 
      storage: 290, 
      network: "10 Gbps", 
      utilization: 58 
    },
    { 
      id: "vdc-5", 
      name: "UK VDC", 
      region: "EMEA", 
      status: "maintenance", 
      hyperconvergence: 60, 
      vms: 42, 
      storage: 180, 
      network: "10 Gbps", 
      utilization: 30 
    },
    { 
      id: "vdc-6", 
      name: "South America VDC", 
      region: "SOUTH_AMERICA", 
      status: "active", 
      hyperconvergence: 68, 
      vms: 76, 
      storage: 240, 
      network: "10 Gbps", 
      utilization: 54 
    },
    { 
      id: "vdc-7", 
      name: "Australia VDC", 
      region: "OCEANIA", 
      status: "offline", 
      hyperconvergence: 0, 
      vms: 0, 
      storage: 150, 
      network: "10 Gbps", 
      utilization: 0 
    },
  ];

  // Status badge for data centers
  const getStatusBadge = (status: VirtualDataCenter['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Maintenance</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return null;
    }
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
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Virtual Data Centers</h1>
                <p className="text-muted-foreground">Manage and monitor your virtual data centers</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New VDC
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total VDCs</CardTitle>
                  <CardDescription>Across all regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {virtualDataCenters.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active VDCs</CardTitle>
                  <CardDescription>Currently operational</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {virtualDataCenters.filter(vdc => vdc.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total VMs</CardTitle>
                  <CardDescription>Running across all VDCs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {virtualDataCenters.reduce((acc, vdc) => acc + vdc.vms, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All VDCs</TabsTrigger>
                <TabsTrigger value="na">North America</TabsTrigger>
                <TabsTrigger value="emea">EMEA</TabsTrigger>
                <TabsTrigger value="asia">Asia</TabsTrigger>
                <TabsTrigger value="other">Other Regions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Virtual Data Centers</CardTitle>
                    <CardDescription>Manage all VDCs from one place</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>VMs</TableHead>
                          <TableHead>Storage (TB)</TableHead>
                          <TableHead>Network</TableHead>
                          <TableHead>Hyperconvergence</TableHead>
                          <TableHead>Utilization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {virtualDataCenters.map((vdc) => (
                          <TableRow key={vdc.id}>
                            <TableCell className="font-medium">{vdc.name}</TableCell>
                            <TableCell>{vdc.region}</TableCell>
                            <TableCell>{getStatusBadge(vdc.status)}</TableCell>
                            <TableCell>{vdc.vms}</TableCell>
                            <TableCell>{vdc.storage}</TableCell>
                            <TableCell>{vdc.network}</TableCell>
                            <TableCell>{vdc.hyperconvergence}%</TableCell>
                            <TableCell>{vdc.utilization}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="na" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>North America Virtual Data Centers</CardTitle>
                    <CardDescription>US and Canada VDCs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>VMs</TableHead>
                          <TableHead>Storage (TB)</TableHead>
                          <TableHead>Utilization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {virtualDataCenters.filter(vdc => vdc.region === "NORTH_AMERICA").map((vdc) => (
                          <TableRow key={vdc.id}>
                            <TableCell className="font-medium">{vdc.name}</TableCell>
                            <TableCell>{getStatusBadge(vdc.status)}</TableCell>
                            <TableCell>{vdc.vms}</TableCell>
                            <TableCell>{vdc.storage}</TableCell>
                            <TableCell>{vdc.utilization}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Similar TabsContent for EMEA, Asia, and Other regions */}
              <TabsContent value="emea" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>EMEA Virtual Data Centers</CardTitle>
                    <CardDescription>Europe, Middle East and Africa VDCs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>VMs</TableHead>
                          <TableHead>Storage (TB)</TableHead>
                          <TableHead>Utilization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {virtualDataCenters.filter(vdc => vdc.region === "EMEA").map((vdc) => (
                          <TableRow key={vdc.id}>
                            <TableCell className="font-medium">{vdc.name}</TableCell>
                            <TableCell>{getStatusBadge(vdc.status)}</TableCell>
                            <TableCell>{vdc.vms}</TableCell>
                            <TableCell>{vdc.storage}</TableCell>
                            <TableCell>{vdc.utilization}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="asia" className="space-y-4">
                {/* Asia content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Asia Virtual Data Centers</CardTitle>
                    <CardDescription>Asia Pacific VDCs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>VMs</TableHead>
                          <TableHead>Storage (TB)</TableHead>
                          <TableHead>Utilization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {virtualDataCenters.filter(vdc => vdc.region === "ASIA").map((vdc) => (
                          <TableRow key={vdc.id}>
                            <TableCell className="font-medium">{vdc.name}</TableCell>
                            <TableCell>{getStatusBadge(vdc.status)}</TableCell>
                            <TableCell>{vdc.vms}</TableCell>
                            <TableCell>{vdc.storage}</TableCell>
                            <TableCell>{vdc.utilization}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="other" className="space-y-4">
                {/* Other regions content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Other Regions Virtual Data Centers</CardTitle>
                    <CardDescription>South America, Oceania, and other regions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>VMs</TableHead>
                          <TableHead>Storage (TB)</TableHead>
                          <TableHead>Utilization</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {virtualDataCenters.filter(vdc => !["NORTH_AMERICA", "EMEA", "ASIA"].includes(vdc.region)).map((vdc) => (
                          <TableRow key={vdc.id}>
                            <TableCell className="font-medium">{vdc.name}</TableCell>
                            <TableCell>{vdc.region}</TableCell>
                            <TableCell>{getStatusBadge(vdc.status)}</TableCell>
                            <TableCell>{vdc.vms}</TableCell>
                            <TableCell>{vdc.storage}</TableCell>
                            <TableCell>{vdc.utilization}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataCenter;
