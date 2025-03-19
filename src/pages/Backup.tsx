
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Umbrella, Plus, RefreshCw, Calendar, Clock, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Backup = () => {
  // Mock data for backup jobs
  const backupJobs = [
    {
      id: "backup1",
      name: "Full Backup - All VMs",
      type: "Full",
      schedule: "Daily at 01:00",
      lastRun: "2023-06-15 01:00",
      nextRun: "2023-06-16 01:00",
      status: "success",
      targets: 15,
      retention: "30 days"
    },
    {
      id: "backup2",
      name: "Incremental - Critical VMs",
      type: "Incremental",
      schedule: "Every 4 hours",
      lastRun: "2023-06-15 16:00",
      nextRun: "2023-06-15 20:00",
      status: "success",
      targets: 5,
      retention: "7 days"
    },
    {
      id: "backup3",
      name: "Weekly Full Backup",
      type: "Full",
      schedule: "Sunday at 00:00",
      lastRun: "2023-06-11 00:00",
      nextRun: "2023-06-18 00:00",
      status: "success",
      targets: 20,
      retention: "90 days"
    },
    {
      id: "backup4",
      name: "Database Servers Backup",
      type: "Full",
      schedule: "Daily at 23:00",
      lastRun: "2023-06-14 23:00",
      nextRun: "2023-06-15 23:00",
      status: "warning",
      targets: 3,
      retention: "14 days"
    }
  ];
  
  // Mock data for restore operations
  const restoreJobs = [
    {
      id: "restore1",
      name: "Web Server Restore",
      vm: "web-server-01",
      date: "2023-06-14 10:15",
      status: "completed",
      user: "admin",
      snapshot: "web-server-01_backup_2023-06-14"
    },
    {
      id: "restore2",
      name: "Database File Recovery",
      vm: "db-server-02",
      date: "2023-06-12 15:30",
      status: "completed",
      user: "admin",
      snapshot: "db-server-02_backup_2023-06-12"
    },
    {
      id: "restore3",
      name: "Test VM Restore",
      vm: "test-vm-05",
      date: "2023-06-10 09:45",
      status: "failed",
      user: "operator",
      snapshot: "test-vm-05_backup_2023-06-10"
    }
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
                  <Umbrella className="h-6 w-6" />
                  Backup & Restore
                </h1>
                <p className="text-muted-foreground">
                  Manage backup jobs and restore operations
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>New Backup Job</span>
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="backup-jobs">Backup Jobs</TabsTrigger>
                <TabsTrigger value="restore">Restore</TabsTrigger>
                <TabsTrigger value="storage">Backup Storage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Protected VMs
                      </CardTitle>
                      <ArrowUpCircle className="h-4 w-4 text-hypergreen-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-xs text-muted-foreground">
                        Out of 20 total VMs (90%)
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Success Rate
                      </CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">95%</div>
                      <p className="text-xs text-muted-foreground">
                        Last 30 days (152 operations)
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Storage Used
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.8 TB</div>
                      <p className="text-xs text-muted-foreground">
                        Of 4.0 TB allocated (45%)
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Restore Operations
                      </CardTitle>
                      <ArrowDownCircle className="h-4 w-4 text-hyperblue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">
                        Last 30 days (1 failed)
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Active Backup Jobs</CardTitle>
                    <CardDescription>
                      Currently running backup processes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border animate-pulse">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                          <div>
                            <h4 className="font-medium mb-1">Incremental - Critical VMs</h4>
                            <p className="text-sm text-muted-foreground">Backing up web-server-03</p>
                          </div>
                          <Badge>In Progress</Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>3 of 5 VMs</span>
                            <span>60%</span>
                          </div>
                          <Progress value={60} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Started: 9:45 AM</span>
                          <span>ETA: 10:15 AM</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-center text-muted-foreground">
                        <p>No other active backup jobs at this time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Latest backup and restore operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...restoreJobs, ...backupJobs.map(job => ({ 
                        id: `job-${job.id}`,
                        name: `${job.name} completed`,
                        date: job.lastRun,
                        status: job.status,
                        user: "system"
                      }))].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className={`mt-0.5 h-9 w-9 rounded-full flex items-center justify-center ${
                            activity.status === "completed" || activity.status === "success"
                              ? "bg-hypergreen-100 text-hypergreen-800"
                              : activity.status === "warning"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {activity.status === "completed" || activity.status === "success" ? (
                              <ArrowUpCircle className="h-5 w-5" />
                            ) : activity.status === "warning" ? (
                              <Clock className="h-5 w-5" />
                            ) : (
                              <ArrowDownCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{activity.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.date} by {activity.user}
                            </p>
                          </div>
                          <Badge className={
                            activity.status === "completed" || activity.status === "success"
                              ? "bg-hypergreen-100 text-hypergreen-800 hover:bg-hypergreen-100/80"
                              : activity.status === "warning"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
                              : "bg-red-100 text-red-800 hover:bg-red-100/80"
                          }>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="backup-jobs">
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Backup Jobs</CardTitle>
                      <Button size="sm">New Job</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {backupJobs.map((job) => (
                        <div key={job.id} className="rounded-lg border p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                            <div>
                              <h4 className="font-medium mb-1">{job.name}</h4>
                              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                <span>Type: {job.type}</span>
                                <span>•</span>
                                <span>Schedule: {job.schedule}</span>
                              </div>
                            </div>
                            <Badge className={
                              job.status === "success" 
                                ? "bg-hypergreen-100 text-hypergreen-800" 
                                : job.status === "warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }>
                              {job.status}
                            </Badge>
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Last Run</div>
                              <div className="font-medium">{job.lastRun}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Next Run</div>
                              <div className="font-medium">{job.nextRun}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Target VMs</div>
                              <div className="font-medium">{job.targets} VMs</div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Run Now</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="restore">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Restore Virtual Machine</CardTitle>
                    <CardDescription>
                      Select a virtual machine and backup point to restore
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="vm-select" className="text-sm font-medium">
                            Virtual Machine
                          </label>
                          <Select>
                            <SelectTrigger id="vm-select">
                              <SelectValue placeholder="Select VM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Virtual Machines</SelectLabel>
                                <SelectItem value="web-server-01">web-server-01</SelectItem>
                                <SelectItem value="db-server-02">db-server-02</SelectItem>
                                <SelectItem value="app-server-01">app-server-01</SelectItem>
                                <SelectItem value="test-vm-05">test-vm-05</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="restore-type" className="text-sm font-medium">
                            Restore Type
                          </label>
                          <Select defaultValue="full">
                            <SelectTrigger id="restore-type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Restore Options</SelectLabel>
                                <SelectItem value="full">Full VM Restore</SelectItem>
                                <SelectItem value="files">File-level Restore</SelectItem>
                                <SelectItem value="instant">Instant Recovery</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Restore Point
                        </label>
                        <div className="rounded-md border p-1">
                          <div className="text-center py-8">
                            <p className="text-muted-foreground mb-2">Select a VM to view available restore points</p>
                            <Button variant="outline">Browse Backups</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button disabled>Start Restore</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Restore Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 p-4 font-medium text-sm text-muted-foreground border-b">
                        <div className="col-span-3">Operation</div>
                        <div className="col-span-2">VM</div>
                        <div className="col-span-3">Date</div>
                        <div className="col-span-2">User</div>
                        <div className="col-span-2">Status</div>
                      </div>
                      <div className="divide-y">
                        {restoreJobs.map((job) => (
                          <div key={job.id} className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 transition-colors">
                            <div className="col-span-3 font-medium">{job.name}</div>
                            <div className="col-span-2">{job.vm}</div>
                            <div className="col-span-3">{job.date}</div>
                            <div className="col-span-2">{job.user}</div>
                            <div className="col-span-2">
                              <Badge className={
                                job.status === "completed" 
                                  ? "bg-hypergreen-100 text-hypergreen-800"
                                  : "bg-red-100 text-red-800"
                              }>
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="storage">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup Storage</CardTitle>
                      <CardDescription>
                        Configure storage locations for backups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Primary Backup Repository</h4>
                              <p className="text-sm text-muted-foreground">Local storage (datastore5)</p>
                            </div>
                            <Badge className="bg-hypergreen-100 text-hypergreen-800">Active</Badge>
                          </div>
                          <div className="space-y-1 mb-2">
                            <div className="flex justify-between text-sm">
                              <span>Usage</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} />
                            <div className="text-xs text-muted-foreground">
                              1.8 TB used of 4 TB total
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Scan</Button>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Offsite Repository</h4>
                              <p className="text-sm text-muted-foreground">Remote NAS (nas.example.com)</p>
                            </div>
                            <Badge variant="outline">Secondary</Badge>
                          </div>
                          <div className="space-y-1 mb-2">
                            <div className="flex justify-between text-sm">
                              <span>Usage</span>
                              <span>32%</span>
                            </div>
                            <Progress value={32} />
                            <div className="text-xs text-muted-foreground">
                              1.6 TB used of 5 TB total
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Scan</Button>
                          </div>
                        </div>
                        
                        <Button className="w-full gap-1">
                          <Plus className="h-4 w-4" />
                          <span>Add Storage Location</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup Retention</CardTitle>
                      <CardDescription>
                        Configure how long backups are kept
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">Retention Policies</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Daily Backups</div>
                                <div className="text-sm text-muted-foreground">Keep for 30 days</div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Weekly Backups</div>
                                <div className="text-sm text-muted-foreground">Keep for 90 days</div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Monthly Backups</div>
                                <div className="text-sm text-muted-foreground">Keep for 365 days</div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Yearly Backups</div>
                                <div className="text-sm text-muted-foreground">Keep forever</div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">Housekeeping</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Automatically clean up expired backups and merge backup chains
                          </p>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Auto Cleanup</div>
                                <div className="text-sm text-muted-foreground">Daily at 3:00 AM</div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Compact Full Backups</div>
                                <div className="text-sm text-muted-foreground">Weekly on Sunday</div>
                              </div>
                              <Button size="sm" variant="ghost">Edit</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Backup;
