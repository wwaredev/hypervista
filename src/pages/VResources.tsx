
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define resource types
interface ComputeResource {
  id: string;
  name: string;
  type: "cpu" | "ram" | "gpu";
  total: number;
  used: number;
  unit: string;
  zone: string;
}

const VResources = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Sample compute resources data
  const computeResources: ComputeResource[] = [
    { id: "cpu-1", name: "vCPU Pool A", type: "cpu", total: 256, used: 128, unit: "cores", zone: "us-east-1" },
    { id: "cpu-2", name: "vCPU Pool B", type: "cpu", total: 512, used: 342, unit: "cores", zone: "us-west-1" },
    { id: "cpu-3", name: "vCPU Pool C", type: "cpu", total: 128, used: 98, unit: "cores", zone: "eu-central-1" },
    { id: "ram-1", name: "Memory Pool A", type: "ram", total: 1024, used: 768, unit: "GB", zone: "us-east-1" },
    { id: "ram-2", name: "Memory Pool B", type: "ram", total: 2048, used: 1536, unit: "GB", zone: "us-west-1" },
    { id: "ram-3", name: "Memory Pool C", type: "ram", total: 512, used: 384, unit: "GB", zone: "eu-central-1" },
    { id: "gpu-1", name: "GPU Pool A", type: "gpu", total: 8, used: 6, unit: "cards", zone: "us-east-1" },
    { id: "gpu-2", name: "GPU Pool B", type: "gpu", total: 16, used: 10, unit: "cards", zone: "us-west-1" },
  ];

  // Resource instance types
  const instanceTypes = [
    { name: "Bare-Metal Server Instance", description: "Physical server with dedicated resources", specs: "Up to 128 cores, 2TB RAM" },
    { name: "VPS Instance", description: "Virtual private server with guaranteed resources", specs: "2-32 cores, 4-256GB RAM" },
    { name: "VMCloud / Cloud Server Instance", description: "Flexible cloud server with scalable resources", specs: "1-64 cores, 2-512GB RAM" },
    { name: "Desktop Instance", description: "Virtual desktop infrastructure", specs: "2-16 cores, 4-64GB RAM" }
  ];

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
                <h1 className="text-2xl font-bold tracking-tight">Virtual Resources</h1>
                <p className="text-muted-foreground">Manage and monitor your virtualized compute resources</p>
              </div>
              <Button>Allocate Resources</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Available vCPUs</CardTitle>
                  <CardDescription>Total virtual CPU cores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{computeResources.filter(r => r.type === "cpu").reduce((acc, r) => acc + (r.total - r.used), 0)} cores</div>
                  <Progress className="mt-2" value={60} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Available Memory</CardTitle>
                  <CardDescription>Total RAM allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{computeResources.filter(r => r.type === "ram").reduce((acc, r) => acc + (r.total - r.used), 0)} GB</div>
                  <Progress className="mt-2" value={75} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Available GPUs</CardTitle>
                  <CardDescription>Hardware accelerators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{computeResources.filter(r => r.type === "gpu").reduce((acc, r) => acc + (r.total - r.used), 0)} cards</div>
                  <Progress className="mt-2" value={40} />
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mb-4">Resource Pools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {computeResources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <Badge variant={resource.used / resource.total > 0.8 ? "destructive" : "outline"}>
                        {resource.zone}
                      </Badge>
                    </div>
                    <CardDescription>
                      {resource.used} / {resource.total} {resource.unit} ({Math.round((resource.used / resource.total) * 100)}% used)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress 
                      value={(resource.used / resource.total) * 100} 
                      className={cn(
                        (resource.used / resource.total) > 0.9 ? "text-red-500" : 
                        (resource.used / resource.total) > 0.7 ? "text-amber-500" : 
                        "text-emerald-500"
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Available Instance Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {instanceTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Specifications: {type.specs}</p>
                    <Button className="mt-4" variant="outline">Deploy Instance</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VResources;
