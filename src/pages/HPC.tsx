
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, Plus, Search, Filter, RefreshCw, Server, Database, Gauge, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

const HPC = () => {
  const [activeTab, setActiveTab] = useState("clusters");
  
  // Mock HPC cluster data
  const hpcClusters = [
    {
      id: "cluster-1",
      name: "ML Research Cluster",
      nodes: 12,
      cores: 576,
      ram: 4608,
      status: "active",
      utilization: 87,
      jobs: 34,
    },
    {
      id: "cluster-2",
      name: "Genomics Computation",
      nodes: 8,
      cores: 384,
      ram: 3072,
      status: "active",
      utilization: 92,
      jobs: 28,
    },
    {
      id: "cluster-3",
      name: "Physics Simulation",
      nodes: 16,
      cores: 768,
      ram: 6144,
      status: "maintenance",
      utilization: 0,
      jobs: 0,
    },
    {
      id: "cluster-4",
      name: "Financial Modeling",
      nodes: 6,
      cores: 288,
      ram: 2304,
      status: "active",
      utilization: 45,
      jobs: 12,
    },
  ];
  
  // Mock HPC jobs data
  const hpcJobs = [
    {
      id: "job-1",
      name: "Neural Network Training",
      cluster: "ML Research Cluster",
      user: "ai_team",
      status: "running",
      progress: 67,
      cores: 96,
      ram: 768,
      runtime: "18h 43m",
      priority: "high",
    },
    {
      id: "job-2",
      name: "Protein Folding Analysis",
      cluster: "Genomics Computation",
      user: "bio_research",
      status: "running",
      progress: 89,
      cores: 128,
      ram: 1024,
      runtime: "32h 12m",
      priority: "critical",
    },
    {
      id: "job-3",
      name: "Weather Prediction Model",
      cluster: "Financial Modeling",
      user: "climate_science",
      status: "queued",
      progress: 0,
      cores: 64,
      ram: 512,
      runtime: "0h 0m",
      priority: "normal",
    },
    {
      id: "job-4",
      name: "Market Volatility Simulation",
      cluster: "Financial Modeling",
      user: "trading_dept",
      status: "running",
      progress: 23,
      cores: 32,
      ram: 256,
      runtime: "2h 17m",
      priority: "high",
    },
  ];

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
                    <Cpu className="h-6 w-6" />
                    High Performance Computing
                  </h1>
                  <p className="text-muted-foreground">
                    Manage HPC clusters, jobs, and resources
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>New Cluster</span>
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Submit Job</span>
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
                    placeholder="Search clusters, jobs..."
                    className="w-full pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="clusters" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="clusters">Clusters</TabsTrigger>
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="clusters" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {hpcClusters.map((cluster) => (
                      <ClusterCard key={cluster.id} cluster={cluster} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="jobs" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    {hpcJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <ResourceCard 
                      title="Total Computing Power" 
                      value="2,016" 
                      unit="CPU Cores"
                      icon={Cpu}
                      description="Across all active clusters"
                    />
                    <ResourceCard 
                      title="Total Memory" 
                      value="16,128" 
                      unit="GB RAM"
                      icon={Database}
                      description="Available for computation"
                    />
                    <ResourceCard 
                      title="Average Queue Time" 
                      value="26" 
                      unit="minutes"
                      icon={Clock}
                      description="For normal priority jobs"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

interface ClusterProps {
  cluster: {
    id: string;
    name: string;
    nodes: number;
    cores: number;
    ram: number;
    status: string;
    utilization: number;
    jobs: number;
  };
}

const ClusterCard = ({ cluster }: ClusterProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{cluster.name}</CardTitle>
          <Badge 
            variant={cluster.status === "active" ? "outline" : "destructive"} 
            className={cluster.status === "active" ? "bg-green-50 text-green-700 border-green-200" : ""}
          >
            {cluster.status.charAt(0).toUpperCase() + cluster.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Nodes:</span>
            <span className="font-medium">{cluster.nodes}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">CPU Cores:</span>
            <span className="font-medium">{cluster.cores}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Memory:</span>
            <span className="font-medium">{cluster.ram} GB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Jobs:</span>
            <span className="font-medium">{cluster.jobs}</span>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Utilization:</span>
              <span className="font-medium">{cluster.utilization}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-hyperblue-500 h-2.5 rounded-full" 
                style={{ width: `${cluster.utilization}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Manage Cluster</Button>
      </CardFooter>
    </Card>
  );
};

interface JobProps {
  job: {
    id: string;
    name: string;
    cluster: string;
    user: string;
    status: string;
    progress: number;
    cores: number;
    ram: number;
    runtime: string;
    priority: string;
  };
}

const JobCard = ({ job }: JobProps) => {
  const priorityColor = 
    job.priority === "critical" ? "text-red-600" :
    job.priority === "high" ? "text-amber-600" : "text-blue-600";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{job.name}</CardTitle>
            <CardDescription>Cluster: {job.cluster}</CardDescription>
          </div>
          <Badge 
            variant={job.status === "running" ? "outline" : job.status === "queued" ? "secondary" : "default"} 
            className={job.status === "running" ? "bg-green-50 text-green-700 border-green-200" : ""}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">User</div>
              <div className="font-medium">{job.user}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Priority</div>
              <div className={`font-medium ${priorityColor}`}>{job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">CPU</div>
              <div className="font-medium">{job.cores} cores</div>
            </div>
            <div>
              <div className="text-muted-foreground">RAM</div>
              <div className="font-medium">{job.ram} GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Runtime</div>
              <div className="font-medium">{job.runtime}</div>
            </div>
          </div>
          
          {job.status === "running" && (
            <div className="pt-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress:</span>
                <span className="font-medium">{job.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-hyperblue-500 h-2.5 rounded-full" 
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">Details</Button>
        {job.status === "running" && <Button variant="destructive" size="icon"><Clock className="h-4 w-4" /></Button>}
      </CardFooter>
    </Card>
  );
};

interface ResourceCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  description: string;
}

const ResourceCard = ({ title, value, unit, icon: Icon, description }: ResourceCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-hyperblue-500" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold">{value}</span>
          <span className="text-lg text-muted-foreground mb-1">{unit}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">View Allocation</Button>
      </CardFooter>
    </Card>
  );
};

export default HPC;
