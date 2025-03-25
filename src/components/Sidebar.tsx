import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart2,
  Cloud,
  Database,
  HardDrive,
  Network,
  Server,
  Settings,
  Shield,
  Umbrella,
  Monitor,
  Cpu,
  GitBranch,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarLink {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
}

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links: SidebarLink[] = [
    { title: "Dashboard", icon: BarChart2, href: "/" },
    { title: "Virtual Machines", icon: Monitor, href: "/virtualmachines", badge: "12" },
    { title: "Storage", icon: HardDrive, href: "/storage" },
    { title: "Networking", icon: Network, href: "/networking" },
    { title: "Cluster", icon: Server, href: "/cluster", badge: "3" },
    { title: "Backup", icon: Umbrella, href: "/backup" },
    { title: "Gallery", icon: Cloud, href: "/gallery" },
    { title: "HPC", icon: Cpu, href: "/hpc" },
    { title: "HCI", icon: GitBranch, href: "/hci" },
    { title: "Security", icon: Shield, href: "/security" },
  ];

  const bottomLinks: SidebarLink[] = [
    { title: "Settings", icon: Settings, href: "/settings" },
  ];
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-[calc(100vh-4rem)] fixed top-16 left-0 transition-all duration-300 z-40",
        collapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <ScrollArea className="h-full">
        <div className="py-4">
          <nav className="space-y-1 px-3">
            {links.map((link) => (
              <NavItem 
                key={link.href} 
                link={link} 
                active={location.pathname === link.href}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
      
        <div className="border-t border-sidebar-border py-4 px-3 mt-auto">
          <nav className="space-y-1">
            {bottomLinks.map((link) => (
              <NavItem 
                key={link.href} 
                link={link} 
                active={location.pathname === link.href}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
      </ScrollArea>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 translate-x-1/2 top-4 bg-card border border-border text-muted-foreground rounded-full shadow-md hover:bg-muted"
        onClick={toggleSidebar}
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
    </aside>
  );
};

const NavItem = ({ 
  link, 
  active, 
  collapsed 
}: { 
  link: SidebarLink; 
  active: boolean;
  collapsed: boolean;
}) => {
  const Icon = link.icon;
  
  const item = (
    <Link
      to={link.href}
      className={cn(
        "group flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5" />
      {!collapsed && (
        <>
          <span className="flex-1">{link.title}</span>
          {link.badge && (
            <span className="ml-auto inline-block py-0.5 px-2 text-xs rounded-full bg-hyperblue-500/20 text-hyperblue-100">
              {link.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
  
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{item}</div>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {link.title}
          {link.badge && (
            <span className="inline-block py-0.5 px-2 text-xs rounded-full bg-hyperblue-500/20 text-hyperblue-900">
              {link.badge}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return item;
};
