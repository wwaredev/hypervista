
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import VirtualMachines from "./pages/VirtualMachines";
import Storage from "./pages/Storage";
import Networking from "./pages/Networking";
import Cluster from "./pages/Cluster";
import Backup from "./pages/Backup";
import Gallery from "./pages/Gallery";
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
          <Route path="/storage" element={<Storage />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/cluster" element={<Cluster />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
