import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";

const HCI = () => {
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
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Hyper-Converged Infrastructure (HCI)
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor your HCI environment.
            </p>
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">
                HCI Management Dashboard
              </h3>
              <p className="text-muted-foreground">
                Detailed HCI metrics and configuration
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HCI;
