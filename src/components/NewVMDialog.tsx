
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewVMDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// VM creation form schema
const vmFormSchema = z.object({
  name: z.string().min(3, {
    message: "VM name must be at least 3 characters long",
  }),
  instanceType: z.enum(["bare-metal", "vps", "cloud", "desktop"]),
  os: z.string({
    required_error: "Please select an operating system",
  }),
  cpu: z.number().min(1).max(128),
  ram: z.number().min(1).max(2048),
  storage: z.number().min(10).max(10000),
  networkSpeed: z.enum(["1", "10", "40", "100"]),
  backupEnabled: z.boolean().default(false),
  region: z.string({
    required_error: "Please select a region",
  }),
  tags: z.string().optional(),
});

type VMFormValues = z.infer<typeof vmFormSchema>;

export function NewVMDialog({ open, onOpenChange }: NewVMDialogProps) {
  const [step, setStep] = useState(1);

  // Default values for the form
  const defaultValues: Partial<VMFormValues> = {
    name: "",
    instanceType: "cloud",
    os: "",
    cpu: 2,
    ram: 4,
    storage: 40,
    networkSpeed: "1",
    backupEnabled: false,
    region: "",
    tags: "",
  };

  const form = useForm<VMFormValues>({
    resolver: zodResolver(vmFormSchema),
    defaultValues,
  });

  function onSubmit(data: VMFormValues) {
    // In a real app, this would create the VM
    toast({
      title: "Virtual Machine Creation Started",
      description: `Creating ${data.name} with ${data.cpu} vCPUs and ${data.ram}GB RAM in ${data.region}.`,
    });
    onOpenChange(false);
    form.reset();
    setStep(1);
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
    setStep(1);
  };

  // Calculate estimated cost based on selected resources
  const calculateCost = () => {
    const values = form.getValues();
    const cpuCost = values.cpu * 5;
    const ramCost = values.ram * 2;
    const storageCost = values.storage * 0.1;
    const networkCost = parseInt(values.networkSpeed || "1") * 10;
    const backupCost = values.backupEnabled ? 20 : 0;
    
    return (cpuCost + ramCost + storageCost + networkCost + backupCost).toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Virtual Machine</DialogTitle>
          <DialogDescription>
            Configure and deploy a new virtual machine to your infrastructure.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mb-4">
          <div className={`px-4 py-2 rounded-md ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            1. Basics
          </div>
          <div className={`px-4 py-2 rounded-md ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            2. Resources
          </div>
          <div className={`px-4 py-2 rounded-md ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            3. Networking
          </div>
          <div className={`px-4 py-2 rounded-md ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            4. Review
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Virtual Machine Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter VM name" {...field} />
                      </FormControl>
                      <FormDescription>
                        A unique name for your virtual machine.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instanceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instance Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select instance type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bare-metal">Bare-Metal Server Instance</SelectItem>
                          <SelectItem value="vps">VPS Instance</SelectItem>
                          <SelectItem value="cloud">VMCloud / Cloud Server Instance</SelectItem>
                          <SelectItem value="desktop">Desktop Instance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of virtual machine instance to create.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="os"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operating System</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an operating system" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ubuntu-22.04">Ubuntu 22.04 LTS</SelectItem>
                          <SelectItem value="ubuntu-20.04">Ubuntu 20.04 LTS</SelectItem>
                          <SelectItem value="debian-11">Debian 11</SelectItem>
                          <SelectItem value="centos-8">CentOS 8</SelectItem>
                          <SelectItem value="rocky-8">Rocky Linux 8</SelectItem>
                          <SelectItem value="windows-server-2022">Windows Server 2022</SelectItem>
                          <SelectItem value="windows-11">Windows 11 Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The operating system for your virtual machine.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East (Virginia)</SelectItem>
                          <SelectItem value="us-west-1">US West (California)</SelectItem>
                          <SelectItem value="eu-central-1">EU Central (Frankfurt)</SelectItem>
                          <SelectItem value="ap-tokyo-1">Asia Pacific (Tokyo)</SelectItem>
                          <SelectItem value="sa-east-1">South America (São Paulo)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The geographical region where your VM will be deployed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cpu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPU Cores: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={form.getValues().instanceType === "bare-metal" ? 128 : 64}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Number of virtual CPU cores.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memory (RAM): {field.value} GB</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={form.getValues().instanceType === "bare-metal" ? 2048 : 512}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Amount of RAM in GB.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage: {field.value} GB</FormLabel>
                      <FormControl>
                        <Slider
                          min={10}
                          max={10000}
                          step={10}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Storage capacity in GB.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="networkSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network Speed</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-2"
                        >
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">1 Gbps</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="10" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">10 Gbps</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="40" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">40 Gbps</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="100" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">100 Gbps</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Network speed for your virtual machine.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backupEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enable Automated Backups
                        </FormLabel>
                        <FormDescription>
                          Daily backups with 7-day retention (additional cost applies).
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. production, web, app" {...field} />
                      </FormControl>
                      <FormDescription>
                        Add tags separated by commas to organize your VMs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">VM Configuration Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{form.getValues().name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instance Type:</span>
                      <span className="font-medium">
                        {form.getValues().instanceType === "bare-metal" && "Bare-Metal Server"}
                        {form.getValues().instanceType === "vps" && "VPS"}
                        {form.getValues().instanceType === "cloud" && "VMCloud / Cloud Server"}
                        {form.getValues().instanceType === "desktop" && "Desktop"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operating System:</span>
                      <span className="font-medium">{form.getValues().os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region:</span>
                      <span className="font-medium">{form.getValues().region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPU:</span>
                      <span className="font-medium">{form.getValues().cpu} vCPUs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="font-medium">{form.getValues().ram} GB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{form.getValues().storage} GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network Speed:</span>
                      <span className="font-medium">{form.getValues().networkSpeed} Gbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Automated Backups:</span>
                      <span className="font-medium">{form.getValues().backupEnabled ? "Enabled" : "Disabled"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tags:</span>
                      <span className="font-medium">{form.getValues().tags || "None"}</span>
                    </div>
                    <div className="pt-4 mt-4 border-t">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Estimated Monthly Cost:</span>
                        <span>${calculateCost()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button onClick={handleNext}>
            {step < 4 ? "Next" : "Create VM"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
