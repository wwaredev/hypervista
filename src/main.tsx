import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import './index.css'
import './process-polyfill'

// Import page components
import Index from './components/Index'
import VirtualMachines from './components/VirtualMachines'
import Storage from './components/Storage'
import Networking from './components/Networking'
import Cluster from './components/Cluster'
import Gallery from './components/Gallery'
import Backup from './components/Backup'
import DataCenter from './components/DataCenter'
import Locations from './components/Locations'
import Cloud from './components/Cloud'
import HPC from './components/HPC'
import HCI from './components/HCI'
import Documentation from './components/Documentation'
import Security from './components/Security'
import VResources from './components/VResources'
import NotFound from './components/NotFound'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/virtualmachines" element={<VirtualMachines />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/cluster" element={<Cluster />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/backup" element={<Backup />} />
            <Route path="/datacenter" element={<DataCenter />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/cloud" element={<Cloud />} />
            <Route path="/hpc" element={<HPC />} />
            <Route path="/hci" element={<HCI />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/security" element={<Security />} />
            <Route path="/vresources" element={<VResources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)