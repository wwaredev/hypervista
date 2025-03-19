
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CpuIcon, MemoryStick, HardDrive, Network } from "lucide-react";
import { cn } from '@/lib/utils';

interface ResourceData {
  name: string;
  value: number;
  limit: number;
  icon: React.ElementType;
  color: string;
}

export const ResourceUsage = () => {
  const resources: ResourceData[] = [
    {
      name: "CPU",
      value: 42,
      limit: 100,
      icon: CpuIcon,
      color: "hyperblue"
    },
    {
      name: "Memory",
      value: 68,
      limit: 100,
      icon: MemoryStick,
      color: "hypergreen"
    },
    {
      name: "Storage",
      value: 55,
      limit: 100,
      icon: HardDrive,
      color: "amber"
    },
    {
      name: "Network",
      value: 23,
      limit: 100,
      icon: Network,
      color: "purple"
    },
  ];
  
  // Mock data for the chart
  const data = [
    { time: '00:00', cpu: 20, memory: 30, storage: 50, network: 10 },
    { time: '04:00', cpu: 25, memory: 35, storage: 52, network: 15 },
    { time: '08:00', cpu: 30, memory: 45, storage: 55, network: 20 },
    { time: '12:00', cpu: 40, memory: 60, storage: 57, network: 18 },
    { time: '16:00', cpu: 45, memory: 65, storage: 55, network: 22 },
    { time: '20:00', cpu: 42, memory: 68, storage: 55, network: 23 },
  ];

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div key={resource.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-5 w-5", {
                    "text-hyperblue-500": resource.color === "hyperblue",
                    "text-hypergreen-500": resource.color === "hypergreen",
                    "text-amber-500": resource.color === "amber",
                    "text-purple-500": resource.color === "purple",
                  })} />
                  <span className="font-medium">{resource.name}</span>
                </div>
                <div className="text-2xl font-bold">
                  {resource.value}%
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    of {resource.limit}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="cpu" stroke="#0d93e7" fill="#0d93e7" fillOpacity={0.2} />
            <Area type="monotone" dataKey="memory" stroke="#29cc78" fill="#29cc78" fillOpacity={0.2} />
            <Area type="monotone" dataKey="storage" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
            <Area type="monotone" dataKey="network" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
