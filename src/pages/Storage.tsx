
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { HardDrive, Plus, Database, RefreshCw, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Storage = () => {
  // Mock storage pool data
  const storagePools = [
    {
      id: "pool-1",
      name: "Main Storage",
      type: "ZFS",
      status: "healthy",
      total: 2048, // GB
      used: 820, // GB
      devices: 8,
    },
    {
      id: "pool-2",
      name: "SSD Cache",
      type: "LVM",
      status: "healthy",
      total: 512, // GB
      used: 128, // GB
      devices: 4,
    },
    {
      id: "pool-3",
      name: "Backup Storage",
      type: "ZFS",
      status: "warning",
      total: 4096, // GB
      used: 3072, // GB
      devices: 12,
    },
  ];
  
  // Mock volume data
  const volumes = [
    {
      id: "vol-1",
      name: "VM Storage",
      pool: "Main Storage",
      size: 500, // GB
      used: 350, // GB
      type: "Thin",
    },
    {
      id: "vol-2",
      name: "Container Storage",
      pool: "Main Storage",
      size: 200, // GB
      used: 120, // GB
      type: "Thin",
    },
    {
      id: "vol-3",
      name: "ISO Images",
      pool: "SSD Cache",
      size: 100, // GB
      used: 45, // GB
      type: "Thick",
    },
    {
      id: "vol-4",
      name: "Backups",
      pool: "Backup Storage",
      size: 2000, // GB
      used: 1800, // GB
      type: "Thick",
    },
  ];
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-hypergreen-500";
      case "warning":
        return "bg-amber-500";
      case "critical":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };
  
  // Function to get usage percentage
  const getUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

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
                  <HardDrive className="h-6 w-6" />
                  Storage
                </h1>
                <p className="text-muted-foreground">
                  Manage storage pools and volumes
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Storage</span>
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Storage Pools</h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {storagePools.map((pool) => (
                    <Card key={pool.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{pool.name}</CardTitle>
                          <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pool.status)} text-white`}>
                            {pool.status}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-muted-foreground">Usage</span>
                              <span className="font-medium">{pool.used} GB / {pool.total} GB</span>
                            </div>
                            <Progress value={getUsagePercentage(pool.used, pool.total)} className="h-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-muted-foreground">Type</div>
                              <div>{pool.type}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Devices</div>
                              <div>{pool.devices}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" className="w-full">Manage</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Volumes</h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {volumes.map((volume) => (
                    <Card key={volume.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{volume.name}</CardTitle>
                        <p className="text-muted-foreground text-sm">Pool: {volume.pool}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-muted-foreground">Usage</span>
                              <span className="font-medium">{volume.used} GB / {volume.size} GB</span>
                            </div>
                            <Progress value={getUsagePercentage(volume.used, volume.size)} className="h-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-muted-foreground">Type</div>
                              <div>{volume.type}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Free</div>
                              <div>{volume.size - volume.used} GB</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex gap-2">
                        <Button variant="ghost" size="sm" className="flex-1">Edit</Button>
                        <Button variant="ghost" size="sm" className="flex-1">Delete</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Storage;
