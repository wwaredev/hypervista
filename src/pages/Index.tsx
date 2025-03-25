
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { cn } from "@/lib/utils";

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
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
          <Tabs defaultValue="overview" className="w-full h-full">
            <div className="border-b px-6 sticky top-0 bg-background z-10">
              <TabsList className="justify-start -mb-px">
                <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
                <TabsTrigger value="monitoring" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Monitoring</TabsTrigger>
                <TabsTrigger value="events" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Events</TabsTrigger>
                <TabsTrigger value="logs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Logs</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="m-0 overflow-y-auto">
              <Dashboard />
            </TabsContent>
            <TabsContent value="monitoring" className="m-0 p-6 overflow-y-auto">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Monitoring Dashboard</h3>
                <p className="text-muted-foreground">Detailed system metrics and alerts</p>
              </div>
            </TabsContent>
            <TabsContent value="events" className="m-0 p-6 overflow-y-auto">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Events Timeline</h3>
                <p className="text-muted-foreground">System events and notifications</p>
              </div>
            </TabsContent>
            <TabsContent value="logs" className="m-0 p-6 overflow-y-auto">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">System Logs</h3>
                <p className="text-muted-foreground">Detailed logging information</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
