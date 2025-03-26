
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, MapPin, Share2 } from "lucide-react";

interface DataCenterLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  region: "NORTH_AMERICA" | "SOUTH_AMERICA" | "EMEA" | "ASIA" | "OCEANIA";
  coordinates: [number, number]; // [longitude, latitude]
  status: "active" | "maintenance" | "offline" | "planned";
  tier: "Tier 1" | "Tier 2" | "Tier 3" | "Tier 4";
  vdcs: number;
  connections: string[];
}

const Locations = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Sample data center locations
  const locations: DataCenterLocation[] = [
    {
      id: "dc-1",
      name: "US East",
      city: "Virginia",
      country: "United States",
      region: "NORTH_AMERICA",
      coordinates: [-78.024902, 37.926868],
      status: "active",
      tier: "Tier 4",
      vdcs: 3,
      connections: ["US West", "EU Central", "South America"]
    },
    {
      id: "dc-2",
      name: "US West",
      city: "California",
      country: "United States",
      region: "NORTH_AMERICA",
      coordinates: [-122.431297, 37.773972],
      status: "active",
      tier: "Tier 4",
      vdcs: 2,
      connections: ["US East", "Asia Pacific", "EU Central"]
    },
    {
      id: "dc-3",
      name: "EU Central",
      city: "Frankfurt",
      country: "Germany",
      region: "EMEA",
      coordinates: [8.682127, 50.110924],
      status: "active",
      tier: "Tier 4",
      vdcs: 3,
      connections: ["US East", "US West", "UK", "Asia Pacific"]
    },
    {
      id: "dc-4",
      name: "Asia Pacific",
      city: "Tokyo",
      country: "Japan",
      region: "ASIA",
      coordinates: [139.691711, 35.689487],
      status: "active",
      tier: "Tier 3",
      vdcs: 2,
      connections: ["US West", "EU Central", "Australia"]
    },
    {
      id: "dc-5",
      name: "UK",
      city: "London",
      country: "United Kingdom",
      region: "EMEA",
      coordinates: [-0.118092, 51.509865],
      status: "maintenance",
      tier: "Tier 3",
      vdcs: 1,
      connections: ["EU Central"]
    },
    {
      id: "dc-6",
      name: "South America",
      city: "São Paulo",
      country: "Brazil",
      region: "SOUTH_AMERICA",
      coordinates: [-46.633308, -23.550520],
      status: "active",
      tier: "Tier 2",
      vdcs: 1,
      connections: ["US East"]
    },
    {
      id: "dc-7",
      name: "Australia",
      city: "Sydney",
      country: "Australia",
      region: "OCEANIA",
      coordinates: [151.209900, -33.865143],
      status: "active",
      tier: "Tier 3",
      vdcs: 1,
      connections: ["Asia Pacific"]
    },
    {
      id: "dc-8",
      name: "India",
      city: "Mumbai",
      country: "India",
      region: "ASIA",
      coordinates: [72.877426, 19.076090],
      status: "planned",
      tier: "Tier 3",
      vdcs: 0,
      connections: ["Asia Pacific", "EU Central"]
    },
  ];

  // Status badge colors for data centers
  const getStatusBadge = (status: DataCenterLocation['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Maintenance</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      case 'planned':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Planned</Badge>;
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
                <h1 className="text-2xl font-bold tracking-tight">Data Center Locations</h1>
                <p className="text-muted-foreground">Global map of physical data centers</p>
              </div>
              <Button>
                <MapPin className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total DCs</CardTitle>
                  <CardDescription>Data centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{locations.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Regions</CardTitle>
                  <CardDescription>Worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {new Set(locations.map(loc => loc.region)).size}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active DCs</CardTitle>
                  <CardDescription>Operational status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {locations.filter(loc => loc.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total VDCs</CardTitle>
                  <CardDescription>Virtual data centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {locations.reduce((acc, loc) => acc + loc.vdcs, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Global Data Center Network</CardTitle>
                <CardDescription>Map view of all data center locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[500px] rounded-md overflow-hidden bg-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover"></div>
                  
                  {/* This is a placeholder for a real map visualization */}
                  <div className="relative z-10 text-center p-6">
                    <Globe className="h-20 w-20 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-white text-xl mb-4">Interactive World Map</h3>
                    <p className="text-slate-300 max-w-md mx-auto mb-4">
                      This would be an interactive map showing all data center locations with connections between them. 
                      Locations are spread across {new Set(locations.map(loc => loc.region)).size} regions worldwide.
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {locations.map(loc => (
                        <Badge key={loc.id} variant="outline" className="text-white border-white">
                          <MapPin className="h-3 w-3 mr-1" />{loc.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Locations</TabsTrigger>
                <TabsTrigger value="na">North America</TabsTrigger>
                <TabsTrigger value="emea">EMEA</TabsTrigger>
                <TabsTrigger value="asia">Asia</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {locations.map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{location.name}</CardTitle>
                          {getStatusBadge(location.status)}
                        </div>
                        <CardDescription>{location.city}, {location.country}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Region:</span>
                            <span>{location.region.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier:</span>
                            <span>{location.tier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Virtual DCs:</span>
                            <span>{location.vdcs}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-muted-foreground text-xs">Connected to:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {location.connections.map((conn, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <Share2 className="h-2 w-2 mr-1" />
                                  {conn}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="na">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {locations.filter(loc => loc.region === "NORTH_AMERICA").map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{location.name}</CardTitle>
                          {getStatusBadge(location.status)}
                        </div>
                        <CardDescription>{location.city}, {location.country}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier:</span>
                            <span>{location.tier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Virtual DCs:</span>
                            <span>{location.vdcs}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Similar code for other tabs (EMEA, Asia, Other) */}
              <TabsContent value="emea">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {locations.filter(loc => loc.region === "EMEA").map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{location.name}</CardTitle>
                          {getStatusBadge(location.status)}
                        </div>
                        <CardDescription>{location.city}, {location.country}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier:</span>
                            <span>{location.tier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Virtual DCs:</span>
                            <span>{location.vdcs}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="asia">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {locations.filter(loc => loc.region === "ASIA").map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{location.name}</CardTitle>
                          {getStatusBadge(location.status)}
                        </div>
                        <CardDescription>{location.city}, {location.country}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier:</span>
                            <span>{location.tier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Virtual DCs:</span>
                            <span>{location.vdcs}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="other">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {locations.filter(loc => !["NORTH_AMERICA", "EMEA", "ASIA"].includes(loc.region)).map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{location.name}</CardTitle>
                          {getStatusBadge(location.status)}
                        </div>
                        <CardDescription>{location.city}, {location.country}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Region:</span>
                            <span>{location.region.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier:</span>
                            <span>{location.tier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Virtual DCs:</span>
                            <span>{location.vdcs}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Locations;
