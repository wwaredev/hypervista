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
import { Layout } from './components/Layout'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/virtualmachines" element={<Layout><VirtualMachines /></Layout>} />
            <Route path="/storage" element={<Layout><Storage /></Layout>} />
            <Route path="/networking" element={<Layout><Networking /></Layout>} />
            <Route path="/cluster" element={<Layout><Cluster /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/backup" element={<Layout><Backup /></Layout>} />
            <Route path="/datacenter" element={<Layout><DataCenter /></Layout>} />
            <Route path="/locations" element={<Layout><Locations /></Layout>} />
            <Route path="/cloud" element={<Layout><Cloud /></Layout>} />
            <Route path="/hpc" element={<Layout><HPC /></Layout>} />
            <Route path="/hci" element={<Layout><HCI /></Layout>} />
            <Route path="/documentation" element={<Layout><Documentation /></Layout>} />
            <Route path="/security" element={<Layout><Security /></Layout>} />
            <Route path="/vresources" element={<Layout><VResources /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)