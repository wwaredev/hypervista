
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Shield,
  AlertTriangle,
  Bell,
  Eye,
  Lock,
  FileText,
  Shield as ShieldIcon,
  UserCheck,
  RefreshCw,
  WifiAlert,
  ShieldAlert,
  FileWarning,
  ShieldQuestion,
  User,
  BarChart3,
  Network,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Security = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Mock data for security alerts
  const securityAlerts = [
    { id: 1, severity: "critical", title: "Unauthorized root access attempt", source: "VM-DB-01", time: "3 mins ago", description: "Multiple failed SSH root login attempts from external IP 203.0.113.42" },
    { id: 2, severity: "high", title: "Unusual network traffic pattern", source: "VM-WEB-03", time: "10 mins ago", description: "Unusual outbound traffic to non-standard ports detected" },
    { id: 3, severity: "medium", title: "VM snapshot unauthorized", source: "Storage-Node-02", time: "25 mins ago", description: "VM snapshot created outside of change management window" },
    { id: 4, severity: "low", title: "TLS certificate expiring", source: "Load-Balancer-01", time: "1 hour ago", description: "TLS certificate will expire in 15 days" },
    { id: 5, severity: "critical", title: "Possible data exfiltration", source: "VM-APP-05", time: "35 mins ago", description: "Large volume of data transferred to external IP during non-business hours" },
  ];

  // Mock data for compliance status
  const complianceItems = [
    { name: "PCI DSS", status: "compliant", percentage: 96 },
    { name: "HIPAA", status: "noncompliant", percentage: 82 },
    { name: "SOC 2", status: "compliant", percentage: 94 },
    { name: "ISO 27001", status: "compliant", percentage: 91 },
    { name: "GDPR", status: "warning", percentage: 87 },
  ];

  // Mock data for vulnerability scan
  const vulnerabilityStats = {
    critical: 5,
    high: 17,
    medium: 42,
    low: 86,
    total: 150,
    lastScan: "2025-04-05T14:30:00Z"
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get severity badge style
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive" className="bg-red-600">Critical</Badge>;
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Low</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };
  
  // Get compliance status badge
  const getComplianceBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-600">Compliant</Badge>;
      case "noncompliant":
        return <Badge variant="destructive">Non-Compliant</Badge>;
      case "warning":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Warning</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  
  // Get progress bar color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-600";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-red-600";
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
                <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
                <p className="text-muted-foreground">Monitor and manage security across your virtualization infrastructure</p>
              </div>
              <Button variant="destructive" className="gap-2">
                <AlertTriangle size={16} />
                Critical Alerts (2)
              </Button>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="siem">SIEM</TabsTrigger>
                <TabsTrigger value="firewall">Firewall Logs</TabsTrigger>
                <TabsTrigger value="vulnerabilities">Vulnerability Management</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="access">Access Control</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">27</div>
                      <p className="text-xs text-muted-foreground">
                        2 critical, 5 high, 10 medium, 10 low
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                      <ShieldIcon className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87/100</div>
                      <div className="mt-2">
                        <Progress value={87} className="h-1" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Up 3 points from last week
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                      <ShieldAlert className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{vulnerabilityStats.total}</div>
                      <p className="text-xs text-muted-foreground">
                        {vulnerabilityStats.critical} critical, {vulnerabilityStats.high} high
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                      <FileWarning className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4/5</div>
                      <p className="text-xs text-muted-foreground">
                        HIPAA remediation required
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Security Alerts</CardTitle>
                    <CardDescription>Real-time security events from across your infrastructure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {securityAlerts.map(alert => (
                        <div key={alert.id} className="flex items-start gap-4 border-b border-border pb-4">
                          <div className="mt-0.5">
                            {alert.severity === "critical" || alert.severity === "high" ? (
                              <AlertTriangle className={cn(
                                "h-5 w-5",
                                alert.severity === "critical" ? "text-red-600" : "text-amber-500"
                              )} />
                            ) : (
                              <Bell className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{alert.title}</div>
                              {getSeverityBadge(alert.severity)}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">{alert.description}</div>
                            <div className="flex items-center text-xs text-muted-foreground mt-2">
                              <span>Source: {alert.source}</span>
                              <span className="mx-2">•</span>
                              <span>{alert.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Security Alerts</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* SIEM Tab */}
              <TabsContent value="siem">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Security Information and Event Management</CardTitle>
                      <CardDescription>
                        Centralized log collection and analysis for security events
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Active Incidents</h3>
                        <div className="space-y-4">
                          <div className="bg-muted/50 border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="font-medium">Incident #23942</span>
                              </div>
                              <Badge variant="destructive">Critical</Badge>
                            </div>
                            <p className="mt-2 text-sm">Possible data exfiltration detected from VM-APP-05</p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs text-muted-foreground">Opened: 35 mins ago</span>
                              <Button size="sm" variant="outline">Investigate</Button>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="font-medium">Incident #23941</span>
                              </div>
                              <Badge variant="destructive">Critical</Badge>
                            </div>
                            <p className="mt-2 text-sm">Multiple failed root login attempts from suspicious IP</p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs text-muted-foreground">Opened: 3 mins ago</span>
                              <Button size="sm" variant="outline">Investigate</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Top Security Sources</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Firewall Logs</span>
                            <span className="font-medium">42,184 events</span>
                          </div>
                          <Progress value={80} className="h-2" />
                          
                          <div className="flex items-center justify-between mt-3">
                            <span>Hypervisor Audit Logs</span>
                            <span className="font-medium">23,571 events</span>
                          </div>
                          <Progress value={45} className="h-2" />
                          
                          <div className="flex items-center justify-between mt-3">
                            <span>VM System Logs</span>
                            <span className="font-medium">18,293 events</span>
                          </div>
                          <Progress value={35} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open SIEM Dashboard</Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Event Statistics</CardTitle>
                        <CardDescription>Last 24 hours</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                              <span>Critical</span>
                            </div>
                            <span className="font-medium">37</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                              <span>High</span>
                            </div>
                            <span className="font-medium">176</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                              <span>Medium</span>
                            </div>
                            <span className="font-medium">583</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                              <span>Low</span>
                            </div>
                            <span className="font-medium">2,148</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                              <span>Informational</span>
                            </div>
                            <span className="font-medium">27,452</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <RefreshCw size={16} />
                          Force Log Collection
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Eye size={16} />
                          View SOC Dashboard
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <FileText size={16} />
                          Export Security Report
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Firewall Logs Tab */}
              <TabsContent value="firewall">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Firewall Log Analysis</CardTitle>
                      <CardDescription>
                        Network traffic and security events from all firewalls
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="rounded-md border">
                          <div className="grid grid-cols-6 p-3 border-b font-medium text-sm">
                            <div>Time</div>
                            <div>Source IP</div>
                            <div>Destination</div>
                            <div>Protocol</div>
                            <div>Action</div>
                            <div>Reason</div>
                          </div>
                          <div className="divide-y">
                            <div className="grid grid-cols-6 p-3 text-sm bg-amber-50 dark:bg-amber-950/20">
                              <div className="text-muted-foreground">14:32:17</div>
                              <div>203.0.113.42</div>
                              <div>192.168.10.5:22</div>
                              <div>TCP</div>
                              <div className="font-medium text-red-600">Blocked</div>
                              <div>Rate limit exceeded</div>
                            </div>
                            <div className="grid grid-cols-6 p-3 text-sm">
                              <div className="text-muted-foreground">14:31:45</div>
                              <div>10.0.0.15</div>
                              <div>10.0.0.25:443</div>
                              <div>TCP</div>
                              <div className="font-medium text-green-600">Allowed</div>
                              <div>Policy match</div>
                            </div>
                            <div className="grid grid-cols-6 p-3 text-sm bg-amber-50 dark:bg-amber-950/20">
                              <div className="text-muted-foreground">14:30:22</div>
                              <div>198.51.100.75</div>
                              <div>192.168.10.10:3389</div>
                              <div>TCP</div>
                              <div className="font-medium text-red-600">Blocked</div>
                              <div>Geolocation policy</div>
                            </div>
                            <div className="grid grid-cols-6 p-3 text-sm">
                              <div className="text-muted-foreground">14:28:56</div>
                              <div>10.0.0.22</div>
                              <div>10.0.0.5:1433</div>
                              <div>TCP</div>
                              <div className="font-medium text-green-600">Allowed</div>
                              <div>Policy match</div>
                            </div>
                            <div className="grid grid-cols-6 p-3 text-sm bg-amber-50 dark:bg-amber-950/20">
                              <div className="text-muted-foreground">14:27:13</div>
                              <div>203.0.113.42</div>
                              <div>192.168.10.5:22</div>
                              <div>TCP</div>
                              <div className="font-medium text-red-600">Blocked</div>
                              <div>Rate limit exceeded</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Showing 5 of 24,819 logs from the last hour
                          </p>
                          <Button variant="outline" size="sm">
                            View Full Logs
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Traffic Summary</CardTitle>
                        <CardDescription>Last 24 hours</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Blocked Traffic</div>
                            <div className="text-sm text-red-600 font-medium">5,248 events</div>
                          </div>
                          <Progress value={22} className="h-2 bg-muted" indicatorClassName="bg-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Allowed Traffic</div>
                            <div className="text-sm text-green-600 font-medium">18,371 events</div>
                          </div>
                          <Progress value={78} className="h-2 bg-muted" indicatorClassName="bg-green-600" />
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4 space-y-3 mt-2">
                          <h4 className="text-sm font-medium">Top Blocked Countries</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>1. Russia</div>
                            <div className="text-right">1,217</div>
                            <div>2. China</div>
                            <div className="text-right">982</div>
                            <div>3. Nigeria</div>
                            <div className="text-right">576</div>
                            <div>4. Brazil</div>
                            <div className="text-right">433</div>
                            <div>5. India</div>
                            <div className="text-right">374</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Attack Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <WifiAlert className="h-4 w-4 text-red-500" />
                              <span>Brute Force</span>
                            </div>
                            <span className="text-sm font-medium">42%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Network className="h-4 w-4 text-amber-500" />
                              <span>Port Scanning</span>
                            </div>
                            <span className="text-sm font-medium">27%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <ShieldQuestion className="h-4 w-4 text-blue-500" />
                              <span>DoS Attempts</span>
                            </div>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-orange-500" />
                              <span>Identity Spoofing</span>
                            </div>
                            <span className="text-sm font-medium">13%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Vulnerability Management Tab */}
              <TabsContent value="vulnerabilities">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Vulnerability Analysis</CardTitle>
                          <CardDescription>
                            System vulnerabilities detected by last scan on {formatDate(vulnerabilityStats.lastScan)}
                          </CardDescription>
                        </div>
                        <Button className="gap-1">
                          <RefreshCw size={14} />
                          Run New Scan
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                          <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-red-700 dark:text-red-400">Critical</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold text-red-700 dark:text-red-400">{vulnerabilityStats.critical}</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-amber-700 dark:text-amber-400">High</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{vulnerabilityStats.high}</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-orange-700 dark:text-orange-400">Medium</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{vulnerabilityStats.medium}</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-blue-700 dark:text-blue-400">Low</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{vulnerabilityStats.low}</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Critical Vulnerabilities</h3>
                          <div className="space-y-3">
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="text-red-600 h-5 w-5" />
                                <h4 className="font-medium">CVE-2023-8652</h4>
                              </div>
                              <p className="mt-2 text-sm">OpenSSL vulnerability affecting 3 VMs with outdated packages</p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-xs">Affected: VM-WEB-01, VM-WEB-02, VM-APP-03</span>
                                <Button size="sm" variant="destructive">Patch Now</Button>
                              </div>
                            </div>
                            
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="text-red-600 h-5 w-5" />
                                <h4 className="font-medium">CVE-2024-1257</h4>
                              </div>
                              <p className="mt-2 text-sm">Hypervisor privilege escalation vulnerability in host cluster</p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-xs">Affected: Host-01, Host-02</span>
                                <Button size="sm" variant="destructive">Patch Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View Full Vulnerability Report</Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Vulnerability Trend</CardTitle>
                        <CardDescription>Past 30 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] flex items-end gap-2">
                          <div className="relative h-full flex-1">
                            <div className="absolute bottom-0 w-full h-[45%] bg-red-200 dark:bg-red-900/30 rounded-sm"></div>
                            <div className="absolute bottom-0 w-full h-[30%] bg-red-500 dark:bg-red-700 rounded-sm"></div>
                            <div className="absolute bottom-[-20px] w-full text-center text-xs">30d</div>
                          </div>
                          <div className="relative h-full flex-1">
                            <div className="absolute bottom-0 w-full h-[55%] bg-red-200 dark:bg-red-900/30 rounded-sm"></div>
                            <div className="absolute bottom-0 w-full h-[35%] bg-red-500 dark:bg-red-700 rounded-sm"></div>
                            <div className="absolute bottom-[-20px] w-full text-center text-xs">20d</div>
                          </div>
                          <div className="relative h-full flex-1">
                            <div className="absolute bottom-0 w-full h-[70%] bg-red-200 dark:bg-red-900/30 rounded-sm"></div>
                            <div className="absolute bottom-0 w-full h-[45%] bg-red-500 dark:bg-red-700 rounded-sm"></div>
                            <div className="absolute bottom-[-20px] w-full text-center text-xs">10d</div>
                          </div>
                          <div className="relative h-full flex-1">
                            <div className="absolute bottom-0 w-full h-[65%] bg-red-200 dark:bg-red-900/30 rounded-sm"></div>
                            <div className="absolute bottom-0 w-full h-[40%] bg-red-500 dark:bg-red-700 rounded-sm"></div>
                            <div className="absolute bottom-[-20px] w-full text-center text-xs">Now</div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 dark:bg-red-700 mr-1 rounded-sm"></div>
                            <span>Critical/High</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-200 dark:bg-red-900/30 mr-1 rounded-sm"></div>
                            <span>All Issues</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Vulnerable Systems</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div>VM-WEB-01</div>
                            <Badge variant="destructive">7 Issues</Badge>
                          </div>
                          <Progress value={70} className="h-2" />
                          
                          <div className="flex justify-between items-center mt-3">
                            <div>Host-01</div>
                            <Badge variant="destructive">5 Issues</Badge>
                          </div>
                          <Progress value={50} className="h-2" />
                          
                          <div className="flex justify-between items-center mt-3">
                            <div>VM-APP-03</div>
                            <Badge variant="outline" className="border-amber-500 text-amber-500">4 Issues</Badge>
                          </div>
                          <Progress value={40} className="h-2" />
                          
                          <div className="flex justify-between items-center mt-3">
                            <div>VM-DB-01</div>
                            <Badge variant="outline" className="border-amber-500 text-amber-500">3 Issues</Badge>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Compliance Tab */}
              <TabsContent value="compliance">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Compliance Status</CardTitle>
                      <CardDescription>Regulatory compliance across your virtualization infrastructure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {complianceItems.map((item) => (
                          <div key={item.name} className="border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{item.name}</div>
                              {getComplianceBadge(item.status)}
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Compliance Score</span>
                                <span>{item.percentage}%</span>
                              </div>
                              <Progress 
                                value={item.percentage} 
                                className={`h-2 ${getProgressColor(item.percentage)}`} 
                              />
                            </div>
                            {item.status !== "compliant" && (
                              <div className="mt-3 text-sm text-muted-foreground">
                                {item.name === "HIPAA" 
                                  ? "Patient data encryption not enforced on 2 storage volumes."
                                  : "User access review not completed in last 90 days."}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Required Actions</CardTitle>
                        <CardDescription>Issues requiring attention</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                          <div className="font-medium">HIPAA Encryption Requirement</div>
                          <p className="text-sm mt-1">Enable encryption for patient data storage volumes.</p>
                          <Button className="w-full mt-3" size="sm">Remediate</Button>
                        </div>
                        
                        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                          <div className="font-medium">GDPR Access Review</div>
                          <p className="text-sm mt-1">Complete quarterly user access review.</p>
                          <Button className="w-full mt-3" size="sm">Schedule Review</Button>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                          <div className="font-medium">ISO 27001 Documentation</div>
                          <p className="text-sm mt-1">Update system documentation for annual audit.</p>
                          <Button className="w-full mt-3" size="sm" variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Compliance Reports</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <FileText className="h-4 w-4" />
                          Generate HIPAA Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <FileText className="h-4 w-4" />
                          Generate PCI DSS Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <FileText className="h-4 w-4" />
                          Generate ISO 27001 Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <FileText className="h-4 w-4" />
                          View Audit History
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Access Control Tab */}
              <TabsContent value="access">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Access Control Management</CardTitle>
                      <CardDescription>Manage user access and privileges across your infrastructure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border">
                        <div className="flex items-center p-4 border-b font-medium">
                          <div className="w-1/4">User</div>
                          <div className="w-1/4">Role</div>
                          <div className="w-1/4">Access Areas</div>
                          <div className="w-1/4">Status</div>
                        </div>
                        <div className="divide-y">
                          <div className="flex items-center p-4">
                            <div className="w-1/4 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">JD</div>
                              <div>
                                <div className="font-medium">John Doe</div>
                                <div className="text-xs text-muted-foreground">john@example.com</div>
                              </div>
                            </div>
                            <div className="w-1/4">Administrator</div>
                            <div className="w-1/4">All Systems</div>
                            <div className="w-1/4">
                              <Badge className="bg-green-600">Active</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4">
                            <div className="w-1/4 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">JS</div>
                              <div>
                                <div className="font-medium">Jane Smith</div>
                                <div className="text-xs text-muted-foreground">jane@example.com</div>
                              </div>
                            </div>
                            <div className="w-1/4">Operator</div>
                            <div className="w-1/4">VM Management</div>
                            <div className="w-1/4">
                              <Badge className="bg-green-600">Active</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4">
                            <div className="w-1/4 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">RJ</div>
                              <div>
                                <div className="font-medium">Robert Johnson</div>
                                <div className="text-xs text-muted-foreground">robert@example.com</div>
                              </div>
                            </div>
                            <div className="w-1/4">Security Analyst</div>
                            <div className="w-1/4">Security, Logs</div>
                            <div className="w-1/4">
                              <Badge className="bg-green-600">Active</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4">
                            <div className="w-1/4 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700">KL</div>
                              <div>
                                <div className="font-medium">Kate Lee</div>
                                <div className="text-xs text-muted-foreground">kate@example.com</div>
                              </div>
                            </div>
                            <div className="w-1/4">DevOps</div>
                            <div className="w-1/4">Gallery, VMs, Storage</div>
                            <div className="w-1/4">
                              <Badge variant="outline" className="border-amber-500 text-amber-500">Locked</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Audit Log</Button>
                      <Button>Manage Users</Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Authentication Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-green-600" />
                            <span>MFA Enabled Users</span>
                          </div>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-amber-500" />
                            <span>Password Policy Compliance</span>
                          </div>
                          <span className="font-medium">93%</span>
                        </div>
                        <Progress value={93} className="h-2" />
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-blue-500" />
                            <span>Privileged Account Review</span>
                          </div>
                          <span className="font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Access Events</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">14:35:12</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Login</Badge>
                          </div>
                          <div className="font-medium mt-1">Robert Johnson</div>
                          <div className="text-xs text-muted-foreground">IP: 10.0.0.15</div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">14:32:08</span>
                            <Badge variant="outline" className="text-red-600 border-red-600">Failed</Badge>
                          </div>
                          <div className="font-medium mt-1">Unknown User</div>
                          <div className="text-xs text-muted-foreground">IP: 203.0.113.42</div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">14:28:43</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Login</Badge>
                          </div>
                          <div className="font-medium mt-1">John Doe</div>
                          <div className="text-xs text-muted-foreground">IP: 10.0.0.22</div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">14:15:31</span>
                            <Badge variant="outline" className="text-amber-500 border-amber-500">Elevated</Badge>
                          </div>
                          <div className="font-medium mt-1">John Doe</div>
                          <div className="text-xs text-muted-foreground">Privilege escalation: sudo</div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View All Events</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Security;
