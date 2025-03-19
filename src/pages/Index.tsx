
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b px-6">
              <TabsList className="justify-start -mb-px">
                <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
                <TabsTrigger value="monitoring" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Monitoring</TabsTrigger>
                <TabsTrigger value="events" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Events</TabsTrigger>
                <TabsTrigger value="logs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Logs</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="m-0">
              <Dashboard />
            </TabsContent>
            <TabsContent value="monitoring" className="m-0 p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Monitoring Dashboard</h3>
                <p className="text-muted-foreground">Detailed system metrics and alerts</p>
              </div>
            </TabsContent>
            <TabsContent value="events" className="m-0 p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Events Timeline</h3>
                <p className="text-muted-foreground">System events and notifications</p>
              </div>
            </TabsContent>
            <TabsContent value="logs" className="m-0 p-6">
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
