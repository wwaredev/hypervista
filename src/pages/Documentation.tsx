
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search, FileText, Video, Check, ExternalLink } from "lucide-react";

interface DocItem {
  id: string;
  title: string;
  description: string;
  category: "guides" | "api" | "tutorials" | "faq";
  tags: string[];
  updated: string; // ISO date string
  difficulty: "beginner" | "intermediate" | "advanced";
}

const Documentation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Sample documentation items
  const documentationItems: DocItem[] = [
    {
      id: "doc-1",
      title: "Getting Started with SysVCenter",
      description: "Learn the basics of managing virtual infrastructure with SysVCenter",
      category: "guides",
      tags: ["beginner", "overview", "setup"],
      updated: "2023-09-15",
      difficulty: "beginner"
    },
    {
      id: "doc-2",
      title: "Virtual Machine Management",
      description: "Comprehensive guide to creating and managing virtual machines",
      category: "guides",
      tags: ["vm", "management", "provisioning"],
      updated: "2023-10-20",
      difficulty: "beginner"
    },
    {
      id: "doc-3",
      title: "Storage Configuration",
      description: "How to configure and optimize storage for your virtual environment",
      category: "guides",
      tags: ["storage", "performance", "configuration"],
      updated: "2023-11-05",
      difficulty: "intermediate"
    },
    {
      id: "doc-4",
      title: "Networking Best Practices",
      description: "Learn best practices for network configuration in virtualized environments",
      category: "guides",
      tags: ["networking", "performance", "security"],
      updated: "2023-12-10",
      difficulty: "intermediate"
    },
    {
      id: "doc-5",
      title: "API Reference Documentation",
      description: "Complete reference for the SysVCenter API",
      category: "api",
      tags: ["api", "development", "integration"],
      updated: "2024-01-15",
      difficulty: "advanced"
    },
    {
      id: "doc-6",
      title: "Backup and Recovery",
      description: "How to implement effective backup and recovery strategies",
      category: "guides",
      tags: ["backup", "disaster-recovery", "security"],
      updated: "2024-02-01",
      difficulty: "intermediate"
    },
    {
      id: "doc-7",
      title: "Cluster Configuration Tutorial",
      description: "Step-by-step tutorial for setting up high-availability clusters",
      category: "tutorials",
      tags: ["cluster", "high-availability", "performance"],
      updated: "2024-02-15",
      difficulty: "advanced"
    },
    {
      id: "doc-8",
      title: "Performance Troubleshooting",
      description: "How to diagnose and resolve common performance issues",
      category: "guides",
      tags: ["performance", "troubleshooting", "optimization"],
      updated: "2024-03-01",
      difficulty: "advanced"
    },
    {
      id: "doc-9",
      title: "Security Hardening Guide",
      description: "Best practices for securing your virtualized infrastructure",
      category: "guides",
      tags: ["security", "compliance", "best-practices"],
      updated: "2024-03-15",
      difficulty: "intermediate"
    },
    {
      id: "doc-10",
      title: "Common FAQ",
      description: "Answers to frequently asked questions about SysVCenter",
      category: "faq",
      tags: ["faq", "troubleshooting", "support"],
      updated: "2024-04-01",
      difficulty: "beginner"
    }
  ];

  // Filter documentation based on search term
  const filteredDocs = searchTerm
    ? documentationItems.filter(
        doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : documentationItems;

  // Get badge color based on difficulty
  const getDifficultyBadge = (difficulty: DocItem['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-green-600">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-amber-500">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-red-500">Advanced</Badge>;
      default:
        return null;
    }
  };

  // Frequently Asked Questions
  const faqs = [
    {
      question: "How do I create a new virtual machine?",
      answer: "Navigate to the Virtual Machines section, click on 'New VM', and follow the setup wizard to configure and deploy your new VM."
    },
    {
      question: "What's the difference between VPS and VMCloud instances?",
      answer: "VPS instances provide dedicated resources with guaranteed performance, while VMCloud instances offer more flexibility with scalable resources that can be adjusted on-demand."
    },
    {
      question: "How do I set up VM backups?",
      answer: "Go to the Backup section, click 'Configure Backup', select the VMs you want to backup, set your schedule and retention policy, then click 'Save'."
    },
    {
      question: "Can I migrate VMs between data centers?",
      answer: "Yes, you can migrate VMs between data centers by using the VM Migration tool under the Virtual Machines section. This allows seamless transfer between different physical locations."
    },
    {
      question: "How do I monitor VM performance?",
      answer: "Use the dashboard widgets or navigate to the specific VM details page to see real-time metrics on CPU, memory, storage, and network usage."
    }
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
                <h1 className="text-2xl font-bold tracking-tight">Documentation & Guides</h1>
                <p className="text-muted-foreground">Find help, tutorials, and reference materials</p>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Documentation</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="api">API Reference</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocs.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                          {getDifficultyBadge(doc.difficulty)}
                        </div>
                        <CardDescription>{doc.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Updated: {new Date(doc.updated).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline" className="text-xs">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="guides">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocs
                    .filter(doc => doc.category === "guides")
                    .map((doc) => (
                      <Card key={doc.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            {getDifficultyBadge(doc.difficulty)}
                          </div>
                          <CardDescription>{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button size="sm" className="w-full">
                            <Book className="mr-2 h-4 w-4" />
                            View Guide
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tutorials">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocs
                    .filter(doc => doc.category === "tutorials")
                    .map((doc) => (
                      <Card key={doc.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            {getDifficultyBadge(doc.difficulty)}
                          </div>
                          <CardDescription>{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              Read
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Video className="mr-2 h-4 w-4" />
                              Watch
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>API Reference Documentation</CardTitle>
                    <CardDescription>Complete reference for integrating with the SysVCenter API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">RESTful API</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Our RESTful API provides programmatic access to SysVCenter resources. Use it to automate deployments, manage resources, and integrate with your tools.
                        </p>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="justify-start">
                            <Check className="mr-2 h-4 w-4" />
                            API Authentication
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Check className="mr-2 h-4 w-4" />
                            Virtual Machine APIs
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Check className="mr-2 h-4 w-4" />
                            Storage APIs
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Check className="mr-2 h-4 w-4" />
                            Network APIs
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">SDK & Libraries</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          We provide software development kits in multiple languages to simplify your integration process.
                        </p>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="justify-start">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Python SDK
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            JavaScript/TypeScript SDK
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Go SDK
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Java SDK
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-md">
                      <h3 className="text-lg font-medium mb-2">API Example</h3>
                      <pre className="p-4 bg-slate-800 text-slate-100 rounded-md overflow-x-auto text-sm">
{`// Example API request to list virtual machines
fetch('https://api.sysvcenter.com/v1/vms', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-md flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Book className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Need more help?</h3>
                        <p className="text-sm text-muted-foreground">
                          If you can't find what you're looking for, check our comprehensive documentation or contact support.
                        </p>
                      </div>
                      <Button className="ml-auto">Contact Support</Button>
                    </div>
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

export default Documentation;
