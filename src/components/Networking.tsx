
import React from 'react';

const Networking = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Network Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Virtual Networks</p>
        <div className="space-y-4 mb-6">
          <div className="border p-4 rounded">
            <div className="flex justify-between">
              <h3 className="font-medium">Production Network</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
            </div>
            <div className="grid grid-cols-2 mt-2 text-sm">
              <div>
                <span className="text-gray-600">CIDR:</span> 10.0.1.0/24
              </div>
              <div>
                <span className="text-gray-600">Gateway:</span> 10.0.1.1
              </div>
            </div>
          </div>
          <div className="border p-4 rounded">
            <div className="flex justify-between">
              <h3 className="font-medium">Development Network</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
            </div>
            <div className="grid grid-cols-2 mt-2 text-sm">
              <div>
                <span className="text-gray-600">CIDR:</span> 10.0.2.0/24
              </div>
              <div>
                <span className="text-gray-600">Gateway:</span> 10.0.2.1
              </div>
            </div>
          </div>
          <div className="border p-4 rounded">
            <div className="flex justify-between">
              <h3 className="font-medium">Testing Network</h3>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Disconnected</span>
            </div>
            <div className="grid grid-cols-2 mt-2 text-sm">
              <div>
                <span className="text-gray-600">CIDR:</span> 10.0.3.0/24
              </div>
              <div>
                <span className="text-gray-600">Gateway:</span> 10.0.3.1
              </div>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Create Network
        </button>
      </div>
    </div>
  );
};

export default Networking;
