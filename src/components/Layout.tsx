import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
          {children}
        </main>
      </div>
    </div>
  );
};