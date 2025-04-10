
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import VirtualMachines from "./pages/VirtualMachines";
import VResources from "./pages/VResources";
import Storage from "./pages/Storage";
import Networking from "./pages/Networking";
import Cluster from "./pages/Cluster";
import Backup from "./pages/Backup";
import Gallery from "./pages/Gallery";
import HPC from "./pages/HPC";
import HCI from "./pages/HCI";
import Cloud from "./pages/Cloud";
import DataCenter from "./pages/DataCenter";
import Locations from "./pages/Locations";
import Documentation from "./pages/Documentation";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/virtualmachines" element={<VirtualMachines />} />
          <Route path="/vresources" element={<VResources />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/cluster" element={<Cluster />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="/datacenter" element={<DataCenter />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/hpc" element={<HPC />} />
          <Route path="/hci" element={<HCI />} />
          <Route path="/security" element={<Security />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
