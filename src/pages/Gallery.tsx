
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GalleryHorizontal, 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  ArrowUpDown,
  Server,
  HardDrive,
  Database,
  Globe,
} from "lucide-react";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("vms");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock VM templates data
  const vmTemplates = [
    {
      id: "template-1",
      name: "Ubuntu Server 22.04 LTS",
      category: "Linux",
      description: "Ubuntu Server 22.04 LTS (Jammy Jellyfish) with minimal installation",
      size: 2.8,
      downloads: 12540,
      featured: true,
      icon: Server,
    },
    {
      id: "template-2",
      name: "Windows Server 2022",
      category: "Windows",
      description: "Windows Server 2022 Standard Edition",
      size: 12.4,
      downloads: 8950,
      featured: true,
      icon: Server,
    },
    {
      id: "template-3",
      name: "CentOS Stream 9",
      category: "Linux",
      description: "CentOS Stream 9 - The upstream development platform for Red Hat Enterprise Linux",
      size: 2.1,
      downloads: 5680,
      featured: false,
      icon: Server,
    },
    {
      id: "template-4",
      name: "Debian 11 (Bullseye)",
      category: "Linux",
      description: "Debian 11 minimal server installation",
      size: 1.9,
      downloads: 7840,
      featured: false,
      icon: Server,
    },
    {
      id: "template-5",
      name: "FreeBSD 13",
      category: "BSD",
      description: "FreeBSD 13.1-RELEASE server",
      size: 1.6,
      downloads: 2340,
      featured: false,
      icon: Server,
    },
    {
      id: "template-6",
      name: "Alpine Linux 3.16",
      category: "Linux",
      description: "Lightweight Alpine Linux 3.16 server",
      size: 0.8,
      downloads: 4230,
      featured: false,
      icon: Server,
    },
  ];
  
  // Mock container templates data
  const containerTemplates = [
    {
      id: "container-1",
      name: "Ubuntu 22.04 Container",
      category: "Linux",
      description: "Minimal Ubuntu 22.04 LTS container",
      size: 0.5,
      downloads: 18950,
      featured: true,
      icon: Database,
    },
    {
      id: "container-2",
      name: "PostgreSQL 14",
      category: "Database",
      description: "PostgreSQL 14 database container",
      size: 0.8,
      downloads: 9870,
      featured: true,
      icon: Database,
    },
    {
      id: "container-3",
      name: "NGINX",
      category: "Web Server",
      description: "NGINX web server and reverse proxy",
      size: 0.3,
      downloads: 15620,
      featured: false,
      icon: Globe,
    },
    {
      id: "container-4",
      name: "Redis",
      category: "Database",
      description: "Redis in-memory data structure store",
      size: 0.2,
      downloads: 8740,
      featured: false,
      icon: Database,
    },
  ];
  
  // Mock storage templates data
  const storageTemplates = [
    {
      id: "storage-1",
      name: "ZFS Storage Pool",
      category: "File System",
      description: "ZFS storage pool configuration with redundancy",
      size: 0.1,
      downloads: 5430,
      featured: true,
      icon: HardDrive,
    },
    {
      id: "storage-2",
      name: "LVM Storage",
      category: "File System",
      description: "Logical Volume Manager storage configuration",
      size: 0.1,
      downloads: 4280,
      featured: false,
      icon: HardDrive,
    },
  ];
  
  // Filter templates based on search query
  const filteredVMTemplates = vmTemplates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredContainerTemplates = containerTemplates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredStorageTemplates = storageTemplates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <GalleryHorizontal className="h-6 w-6" />
                    Gallery
                  </h1>
                  <p className="text-muted-foreground">
                    Browse and download pre-configured templates
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Upload Template</span>
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
                    placeholder="Search templates..."
                    className="w-full pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="vms" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="vms">Virtual Machines</TabsTrigger>
                  <TabsTrigger value="containers">Containers</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                </TabsList>
                
                <TabsContent value="vms" className="space-y-4">
                  {filteredVMTemplates.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filteredVMTemplates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No templates found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try changing your search criteria
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="containers" className="space-y-4">
                  {filteredContainerTemplates.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filteredContainerTemplates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No templates found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try changing your search criteria
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="storage" className="space-y-4">
                  {filteredStorageTemplates.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filteredStorageTemplates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No templates found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try changing your search criteria
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

interface TemplateProps {
  template: {
    id: string;
    name: string;
    category: string;
    description: string;
    size: number;
    downloads: number;
    featured: boolean;
    icon: React.ElementType;
  };
}

const TemplateCard = ({ template }: TemplateProps) => {
  const Icon = template.icon;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-hyperblue-500" />
            <CardTitle className="text-lg">{template.name}</CardTitle>
          </div>
          {template.featured && (
            <Badge variant="outline" className="bg-hyperblue-50 text-hyperblue-700 border-hyperblue-200">
              Featured
            </Badge>
          )}
        </div>
        <div className="text-muted-foreground text-sm">
          {template.category}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{template.description}</p>
        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <div>{template.size} GB</div>
          <div>{template.downloads.toLocaleString()} downloads</div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="w-full gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Gallery;
