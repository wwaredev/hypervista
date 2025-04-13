
import React from 'react';

const Cluster = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cluster Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">3 clusters available</p>
        <div className="space-y-3">
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Cluster A</h3>
              <p className="text-sm text-gray-600">6 nodes</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Cluster B</h3>
              <p className="text-sm text-gray-600">4 nodes</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Maintenance</span>
          </div>
          <div className="border p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-medium">Cluster C</h3>
              <p className="text-sm text-gray-600">8 nodes</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cluster;
