
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { HardDrive, Plus, Database, RefreshCw, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

const Storage = () => {
  // Mock storage data
  const storageTypes = [
    { name: "SSD", value: 2560, color: "#0d93e7" },
    { name: "HDD", value: 8192, color: "#65a3c9" },
    { name: "NVMe", value: 1024, color: "#29cc78" },
  ];
  
  const datastores = [
    { 
      id: "ds-1", 
      name: "datastore1", 
      type: "SSD", 
      total: 1024, 
      used: 645, 
      status: "healthy",
      host: "host-1.example.com",
    },
    { 
      id: "ds-2", 
      name: "datastore2", 
      type: "HDD", 
      total: 4096, 
      used: 2150, 
      status: "healthy",
      host: "host-1.example.com",
    },
    { 
      id: "ds-3", 
      name: "datastore3", 
      type: "SSD", 
      total: 1536, 
      used: 980, 
      status: "warning",
      host: "host-2.example.com",
    },
    { 
      id: "ds-4", 
      name: "datastore4", 
      type: "NVMe", 
      total: 1024, 
      used: 210, 
      status: "healthy",
      host: "host-3.example.com",
    },
    { 
      id: "ds-5", 
      name: "datastore5", 
      type: "HDD", 
      total: 4096, 
      used: 3800, 
      status: "critical",
      host: "host-2.example.com",
    },
  ];
  
  // Calculate totals
  const totalStorage = storageTypes.reduce((sum, type) => sum + type.value, 0);
  const usedStorage = datastores.reduce((sum, ds) => sum + ds.used, 0);
  
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
                  Manage datastores and storage resources
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
            
            <Tabs defaultValue="overview" className="w-full space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="datastores">Datastores</TabsTrigger>
                <TabsTrigger value="volumes">Volumes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Total Storage</CardTitle>
                      <CardDescription>Across all datastores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{(totalStorage / 1024).toFixed(1)} TB</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Database className="h-4 w-4" />
                        <span>{datastores.length} datastores configured</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Used Storage</span>
                          <span className="font-medium">{Math.round((usedStorage / totalStorage) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((usedStorage / totalStorage) * 100)} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Storage Types</CardTitle>
                      <CardDescription>Distribution by media type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={storageTypes}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {storageTypes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                              formatter={(value) => `${(value / 1024).toFixed(2)} TB`}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-around mt-2">
                        {storageTypes.map((type) => (
                          <div key={type.name} className="text-center">
                            <div className="text-sm font-medium">{type.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {(type.value / 1024).toFixed(1)} TB
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Storage Health</CardTitle>
                      <CardDescription>System status overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-hypergreen-500"></div>
                            <span>Healthy</span>
                          </div>
                          <span>{datastores.filter(ds => ds.status === "healthy").length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span>Warning</span>
                          </div>
                          <span>{datastores.filter(ds => ds.status === "warning").length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span>Critical</span>
                          </div>
                          <span>{datastores.filter(ds => ds.status === "critical").length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="datastores">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium text-sm text-muted-foreground border-b">
                    <div className="col-span-3">Datastore</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Capacity</div>
                    <div className="col-span-2">Usage</div>
                    <div className="col-span-2">Host</div>
                    <div className="col-span-1">Status</div>
                  </div>
                  <div className="divide-y">
                    {datastores.map((ds) => {
                      const usagePercent = Math.round((ds.used / ds.total) * 100);
                      return (
                        <div key={ds.id} className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 transition-colors">
                          <div className="col-span-3 font-medium">{ds.name}</div>
                          <div className="col-span-2">{ds.type}</div>
                          <div className="col-span-2">{(ds.total / 1024).toFixed(1)} TB</div>
                          <div className="col-span-2">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm">{usagePercent}%</div>
                              <Progress 
                                value={usagePercent} 
                                className={usagePercent > 85 ? "text-red-500" : ""} 
                              />
                            </div>
                          </div>
                          <div className="col-span-2 text-sm">{ds.host}</div>
                          <div className="col-span-1">
                            <Badge className={
                              ds.status === "healthy" ? "bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80" :
                              ds.status === "warning" ? "bg-amber-100 text-amber-800 hover:bg-amber-100/80" :
                              "bg-red-100 text-red-800 hover:bg-red-100/80"
                            }>
                              {ds.status}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="volumes">
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Volumes</CardTitle>
                    <CardDescription>
                      Manage logical volumes and partitions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Volume Management</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-1 mb-4">
                      Create and manage logical volumes across your datastores
                    </p>
                    <Button>Create Volume</Button>
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

export default Storage;
