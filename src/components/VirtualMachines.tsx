
import React from 'react';

const VirtualMachines = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Virtual Machines</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg">12 Virtual Machines</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            New VM
          </button>
        </div>
        <div className="space-y-3">
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Web Server 01</h3>
              <p className="text-sm text-gray-600">Ubuntu 22.04 • 4 vCPU • 8 GB RAM</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Running</span>
          </div>
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Database 01</h3>
              <p className="text-sm text-gray-600">CentOS 9 • 8 vCPU • 16 GB RAM</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Running</span>
          </div>
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Test Server</h3>
              <p className="text-sm text-gray-600">Windows Server 2022 • 4 vCPU • 8 GB RAM</p>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Stopped</span>
          </div>
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dev Environment</h3>
              <p className="text-sm text-gray-600">Ubuntu 20.04 • 2 vCPU • 4 GB RAM</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Suspended</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualMachines;
