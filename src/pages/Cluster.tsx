
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Server, Plus, RefreshCw, CpuIcon, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";

const Cluster = () => {
  // Mock data for hosts
  const hosts = [
    {
      id: "host1",
      name: "hypervisor-01.example.com",
      status: "running" as const,
      cpu: {
        model: "Intel Xeon Gold 6248R",
        cores: 24,
        threads: 48,
        usage: 32
      },
      memory: {
        total: 384,
        used: 280
      },
      vms: 6,
      vendor: "Dell PowerEdge R740",
      version: "7.0.3",
      uptime: "124 days"
    },
    {
      id: "host2",
      name: "hypervisor-02.example.com",
      status: "running" as const,
      cpu: {
        model: "Intel Xeon Gold 6248R",
        cores: 24,
        threads: 48,
        usage: 48
      },
      memory: {
        total: 384,
        used: 320
      },
      vms: 8,
      vendor: "Dell PowerEdge R740",
      version: "7.0.3",
      uptime: "98 days"
    },
    {
      id: "host3",
      name: "hypervisor-03.example.com",
      status: "running" as const,
      cpu: {
        model: "AMD EPYC 7543",
        cores: 32,
        threads: 64,
        usage: 28
      },
      memory: {
        total: 512,
        used: 290
      },
      vms: 5,
      vendor: "HPE ProLiant DL385 Gen10 Plus",
      version: "7.0.3",
      uptime: "45 days"
    }
  ];
  
  // Cluster services status
  const services = [
    { name: "High Availability", status: "healthy" },
    { name: "DRS (Distributed Resource Scheduler)", status: "healthy" },
    { name: "vMotion", status: "healthy" },
    { name: "Fault Tolerance", status: "warning" },
    { name: "Storage vMotion", status: "healthy" }
  ];
  
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
                  <Server className="h-6 w-6" />
                  Cluster
                </h1>
                <p className="text-muted-foreground">
                  Manage hosts and cluster resources
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Host</span>
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="ha">High Availability</TabsTrigger>
                <TabsTrigger value="resources">Resource Pools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Cluster Summary</CardTitle>
                    <CardDescription>
                      Datacenter 1 / Production Cluster
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Hosts
                        </div>
                        <div className="text-2xl font-bold">{hosts.length}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Total CPUs
                        </div>
                        <div className="text-2xl font-bold">
                          {hosts.reduce((total, host) => total + host.cpu.threads, 0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Total Memory
                        </div>
                        <div className="text-2xl font-bold">
                          {hosts.reduce((total, host) => total + host.memory.total, 0)} GB
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Virtual Machines
                        </div>
                        <div className="text-2xl font-bold">
                          {hosts.reduce((total, host) => total + host.vms, 0)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Resource Utilization</CardTitle>
                      <CardDescription>
                        Cluster capacity and usage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <CpuIcon className="h-4 w-4 text-hyperblue-500" />
                              <span className="font-medium">CPU</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(hosts.reduce((total, host) => total + host.cpu.usage, 0) / hosts.length)}% avg usage
                            </span>
                          </div>
                          <Progress value={Math.round(hosts.reduce((total, host) => total + host.cpu.usage, 0) / hosts.length)} />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-hypergreen-500" />
                              <span className="font-medium">Memory</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(hosts.reduce((total, host) => total + host.memory.used, 0) / hosts.reduce((total, host) => total + host.memory.total, 0) * 100)}% used
                            </span>
                          </div>
                          <Progress 
                            value={Math.round(hosts.reduce((total, host) => total + host.memory.used, 0) / hosts.reduce((total, host) => total + host.memory.total, 0) * 100)} 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Cluster Services</CardTitle>
                      <CardDescription>
                        Status of critical cluster services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {services.map((service) => (
                          <div key={service.name} className="flex justify-between items-center">
                            <span>{service.name}</span>
                            <Badge className={
                              service.status === "healthy" 
                                ? "bg-hypergreen-100 text-hypergreen-800" 
                                : service.status === "warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }>
                              {service.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="hosts">
                <div className="space-y-6">
                  {hosts.map((host) => (
                    <Card key={host.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Server className="h-5 w-5" />
                              {host.name}
                            </CardTitle>
                            <CardDescription>{host.vendor}</CardDescription>
                          </div>
                          <StatusBadge status={host.status} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-3">
                          <div>
                            <div className="text-sm font-medium mb-2">CPU</div>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Model:</span> {host.cpu.model}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Cores/Threads:</span> {host.cpu.cores}/{host.cpu.threads}
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Usage</span>
                                  <span>{host.cpu.usage}%</span>
                                </div>
                                <Progress value={host.cpu.usage} />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-2">Memory</div>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Total:</span> {host.memory.total} GB
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Used:</span> {host.memory.used} GB
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Usage</span>
                                  <span>{Math.round((host.memory.used / host.memory.total) * 100)}%</span>
                                </div>
                                <Progress value={Math.round((host.memory.used / host.memory.total) * 100)} />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-2">Details</div>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Version:</span> {host.version}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Uptime:</span> {host.uptime}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">VMs Running:</span> {host.vms}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="ha">
                <Card>
                  <CardHeader>
                    <CardTitle>High Availability</CardTitle>
                    <CardDescription>
                      Configure high availability settings and policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <div className="text-lg font-medium">HA Status</div>
                        <div className="text-sm text-muted-foreground">Configure cluster high availability settings</div>
                      </div>
                      <Badge className="bg-hypergreen-100 text-hypergreen-800 text-sm px-3 py-1">
                        Enabled
                      </Badge>
                    </div>
                    
                    <div className="rounded-md border p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-hyperblue-500" />
                        <h3 className="font-medium">Admission Control</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        The cluster has reserved resources to guarantee failover capacity
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Host failures cluster tolerates</div>
                          <div className="font-medium">1</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">CPU failover capacity</div>
                          <div className="font-medium">32%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Memory failover capacity</div>
                          <div className="font-medium">30%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="font-medium">VM Restart Priority</div>
                          <div className="text-sm text-muted-foreground">Priority for restarting virtual machines</div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="font-medium">VM Monitoring</div>
                          <div className="text-sm text-muted-foreground">Monitor virtual machine health</div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="font-medium">Datastore Heartbeating</div>
                          <div className="text-sm text-muted-foreground">Configure datastores for heartbeating</div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="font-medium">Advanced Options</div>
                          <div className="text-sm text-muted-foreground">Fine-tune HA behavior</div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Pools</CardTitle>
                    <CardDescription>
                      Manage resource allocation and priorities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Resource Pool Management</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-1 mb-4">
                      Create and manage resource pools to control allocation of CPU and memory resources
                    </p>
                    <Button>Create Resource Pool</Button>
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

export default Cluster;
