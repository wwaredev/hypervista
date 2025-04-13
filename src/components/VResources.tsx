
import React from 'react';

const VResources = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Virtual Resources</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Resource Allocation</p>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">CPU Allocation</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/5"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>60% allocated</span>
              <span>120/200 vCPUs</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Memory Allocation</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full w-4/5"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>80% allocated</span>
              <span>400/500 GB</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Storage Allocation</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-yellow-600 h-2.5 rounded-full w-1/2"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>50% allocated</span>
              <span>5/10 TB</span>
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-3">Resource Pools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border p-3 rounded">
                <h4 className="font-medium">Production</h4>
                <p className="text-sm">80 vCPU • 250 GB RAM • 3 TB Storage</p>
              </div>
              <div className="border p-3 rounded">
                <h4 className="font-medium">Development</h4>
                <p className="text-sm">30 vCPU • 100 GB RAM • 1 TB Storage</p>
              </div>
              <div className="border p-3 rounded">
                <h4 className="font-medium">Testing</h4>
                <p className="text-sm">10 vCPU • 50 GB RAM • 1 TB Storage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VResources;
