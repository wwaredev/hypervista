import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { Network, Plus, RefreshCw, Globe, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Networking = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Mock data for virtual networks
  const virtualNetworks = [
    {
      id: "vnet1",
      name: "Management Network",
      type: "Standard Switch",
      vlan: 10,
      subnet: "192.168.10.0/24",
      gateway: "192.168.10.1",
      connected: 8,
      status: "active"
    },
    {
      id: "vnet2",
      name: "VM Network",
      type: "Standard Switch",
      vlan: 20,
      subnet: "192.168.20.0/24",
      gateway: "192.168.20.1",
      connected: 12,
      status: "active"
    },
    {
      id: "vnet3",
      name: "Storage Network",
      type: "Standard Switch",
      vlan: 30,
      subnet: "192.168.30.0/24",
      gateway: "192.168.30.1",
      connected: 4,
      status: "active"
    },
    {
      id: "vnet4",
      name: "DMZ",
      type: "Distributed Switch",
      vlan: 100,
      subnet: "10.0.0.0/24",
      gateway: "10.0.0.1",
      connected: 3,
      status: "active"
    },
    {
      id: "vnet5",
      name: "Test Network",
      type: "Standard Switch",
      vlan: 50,
      subnet: "192.168.50.0/24",
      gateway: "192.168.50.1",
      connected: 0,
      status: "inactive"
    }
  ];
  
  // Mock data for physical NICs
  const physicalInterfaces = [
    {
      id: "nic1",
      name: "eth0",
      speed: "10 Gbps",
      mac: "aa:bb:cc:dd:ee:ff",
      status: "up",
      traffic: {
        rx: 120,
        tx: 87
      }
    },
    {
      id: "nic2",
      name: "eth1",
      speed: "10 Gbps",
      mac: "aa:bb:cc:dd:ee:00",
      status: "up",
      traffic: {
        rx: 65,
        tx: 42
      }
    },
    {
      id: "nic3",
      name: "eth2",
      speed: "1 Gbps",
      mac: "aa:bb:cc:dd:ee:11",
      status: "down",
      traffic: {
        rx: 0,
        tx: 0
      }
    }
  ];
  
  // Mock data for traffic chart
  const trafficData = [
    { time: '00:00', inbound: 120, outbound: 80 },
    { time: '04:00', inbound: 90, outbound: 60 },
    { time: '08:00', inbound: 240, outbound: 180 },
    { time: '12:00', inbound: 320, outbound: 250 },
    { time: '16:00', inbound: 280, outbound: 210 },
    { time: '20:00', inbound: 160, outbound: 120 },
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <Network className="h-6 w-6" />
                  Networking
                </h1>
                <p className="text-muted-foreground">
                  Manage virtual networks and physical interfaces
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Network</span>
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="virtual-networks">Virtual Networks</TabsTrigger>
                <TabsTrigger value="physical-nics">Physical NICs</TabsTrigger>
                <TabsTrigger value="firewall">Firewall</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Network Traffic</CardTitle>
                      <CardDescription>Current throughput</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={trafficData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [`${value} Mbps`, undefined]} 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="inbound" 
                              stackId="1"
                              stroke="#0d93e7" 
                              fill="#0d93e7" 
                              fillOpacity={0.2} 
                              name="Inbound"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="outbound" 
                              stackId="1"
                              stroke="#29cc78" 
                              fill="#29cc78" 
                              fillOpacity={0.2} 
                              name="Outbound"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Network Health</CardTitle>
                      <CardDescription>Status overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                            <span>Virtual Networks</span>
                          </div>
                          <div>
                            <Badge className="bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80">
                              {virtualNetworks.filter(n => n.status === "active").length} Active
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Network className="h-4 w-4 text-muted-foreground" />
                            <span>Physical NICs</span>
                          </div>
                          <div>
                            <Badge className="bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80 mr-1">
                              {physicalInterfaces.filter(n => n.status === "up").length} Up
                            </Badge>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80">
                              {physicalInterfaces.filter(n => n.status === "down").length} Down
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span>External Connectivity</span>
                          </div>
                          <div>
                            <Badge className="bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80">
                              Normal
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Firewall Status</CardTitle>
                      <CardDescription>Security settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="firewall-toggle" className="flex items-center gap-2 cursor-pointer">
                            <span>Firewall Enabled</span>
                          </Label>
                          <Switch id="firewall-toggle" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ssh-toggle" className="flex items-center gap-2 cursor-pointer">
                            <span>SSH Access</span>
                          </Label>
                          <Switch id="ssh-toggle" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ping-toggle" className="flex items-center gap-2 cursor-pointer">
                            <span>ICMP (Ping)</span>
                          </Label>
                          <Switch id="ping-toggle" />
                        </div>
                        
                        <div className="border-t pt-4 mt-6">
                          <div className="text-sm text-muted-foreground">
                            <p>Active rules: 27</p>
                            <p>Last updated: Today, 14:30</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="virtual-networks">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium text-sm text-muted-foreground border-b">
                    <div className="col-span-2">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-1">VLAN</div>
                    <div className="col-span-2">Subnet</div>
                    <div className="col-span-2">Gateway</div>
                    <div className="col-span-1">VMs</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  <div className="divide-y">
                    {virtualNetworks.map((network) => (
                      <div key={network.id} className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 transition-colors">
                        <div className="col-span-2 font-medium">{network.name}</div>
                        <div className="col-span-2">{network.type}</div>
                        <div className="col-span-1">{network.vlan}</div>
                        <div className="col-span-2 font-mono text-sm">{network.subnet}</div>
                        <div className="col-span-2 font-mono text-sm">{network.gateway}</div>
                        <div className="col-span-1">{network.connected}</div>
                        <div className="col-span-2">
                          <Badge className={
                            network.status === "active" 
                              ? "bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
                          }>
                            {network.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="physical-nics">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium text-sm text-muted-foreground border-b">
                    <div className="col-span-2">Interface</div>
                    <div className="col-span-3">MAC Address</div>
                    <div className="col-span-2">Speed</div>
                    <div className="col-span-2">Incoming</div>
                    <div className="col-span-2">Outgoing</div>
                    <div className="col-span-1">Status</div>
                  </div>
                  <div className="divide-y">
                    {physicalInterfaces.map((nic) => (
                      <div key={nic.id} className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 transition-colors">
                        <div className="col-span-2 font-mono text-sm">{nic.name}</div>
                        <div className="col-span-3 font-mono text-sm">{nic.mac}</div>
                        <div className="col-span-2">{nic.speed}</div>
                        <div className="col-span-2">{nic.traffic.rx} Mbps</div>
                        <div className="col-span-2">{nic.traffic.tx} Mbps</div>
                        <div className="col-span-1">
                          <Badge className={
                            nic.status === "up" 
                              ? "bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80" 
                              : "bg-red-100 text-red-800 hover:bg-red-100/80"
                          }>
                            {nic.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="firewall">
                <Card>
                  <CardHeader>
                    <CardTitle>Firewall Rules</CardTitle>
                    <CardDescription>
                      Configure security policies and network protection
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Network className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Firewall Management</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-1 mb-4">
                      Create and manage firewall rules to secure your virtual infrastructure
                    </p>
                    <Button>Configure Rules</Button>
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

export default Networking;
