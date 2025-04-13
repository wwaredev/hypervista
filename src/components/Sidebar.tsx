
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "../lib/utils";
import {
  BarChart2,
  Cloud,
  Database,
  HardDrive,
  Network,
  Server,
  Monitor,
  Shield,
  Umbrella,
  GalleryHorizontal,
  MapPin,
  Book,
  Cpu,
  GitBranch
} from "lucide-react";

// Componente Sidebar
export const Sidebar = ({ collapsed }) => {
  const router = useRouter();
  
  const links = [
    { title: "Dashboard", icon: BarChart2, href: "/" },
    {
      title: "Virtual Machines",
      icon: Monitor,
      href: "/virtualmachines",
      badge: "12",
      children: [
        { title: "All VMs", icon: Monitor, href: "/virtualmachines" },
        { title: "VResources", icon: Database, href: "/vresources" }
      ]
    },
    { title: "Storage", icon: HardDrive, href: "/storage" },
    { title: "Networking", icon: Network, href: "/networking" },
    { title: "Cluster", icon: Server, href: "/cluster", badge: "3" },
    { title: "Gallery", icon: GalleryHorizontal, href: "/gallery" },
    { title: "Backup", icon: Umbrella, href: "/backup" },
    { title: "Data Center", icon: Database, href: "/datacenter" },
    { title: "Locations", icon: MapPin, href: "/locations" },
    { title: "Cloud", icon: Cloud, href: "/cloud" },
    { title: "HPC", icon: Cpu, href: "/hpc" },
    { title: "HCI", icon: GitBranch, href: "/hci" },
    { title: "Documentation", icon: Book, href: "/documentation" },
    { title: "Security", icon: Shield, href: "/security" }
  ];

  const bottomLinks = [];

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-[calc(100vh-4rem)] fixed top-16 left-0 transition-all duration-300 z-40",
        collapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <div className="h-full overflow-y-auto">
        <div className="py-4">
          <nav className="space-y-1 px-3">
            {links.map((link) => (
              <div key={link.href}>
                <NavItem
                  link={link}
                  active={router.pathname === link.href}
                  collapsed={collapsed}
                />
                {!collapsed && link.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <NavItem
                        key={child.href}
                        link={child}
                        active={router.pathname === child.href}
                        collapsed={collapsed}
                        isChild={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({
  link,
  active,
  collapsed,
  isChild = false
}) => {
  const Icon = link.icon;

  const item = (
    <Link
      href={link.href}
      className={cn(
        "group flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isChild && "text-xs"
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
      <div title={link.title}>
        {item}
      </div>
    );
  }

  return item;
};
