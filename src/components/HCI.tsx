
import React from 'react';

const HCI = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hyper-Converged Infrastructure</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">HCI Status Dashboard</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Storage Capacity</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>75% used</span>
              <span>18TB / 24TB</span>
            </div>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">Compute Resources</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full w-1/2"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>50% used</span>
              <span>128 / 256 vCPUs</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HCI;
