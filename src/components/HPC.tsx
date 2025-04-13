
import React from 'react';

const HPC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">High-Performance Computing</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">HPC Cluster Status</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border p-4 rounded">
            <h3 className="font-medium">Active Jobs</h3>
            <p className="text-xl">8</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">Queued Jobs</h3>
            <p className="text-xl">3</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">Available Nodes</h3>
            <p className="text-xl">12/16</p>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-medium">Recent Jobs</h3>
          <div className="border p-3 rounded grid grid-cols-5 text-sm font-medium bg-gray-50">
            <span>Job ID</span>
            <span>Type</span>
            <span>User</span>
            <span>Status</span>
            <span>Duration</span>
          </div>
          <div className="border p-3 rounded grid grid-cols-5 text-sm">
            <span>HPC-2023-42</span>
            <span>Simulation</span>
            <span>user1</span>
            <span className="text-green-600">Running</span>
            <span>4h 23m</span>
          </div>
          <div className="border p-3 rounded grid grid-cols-5 text-sm">
            <span>HPC-2023-41</span>
            <span>Rendering</span>
            <span>user2</span>
            <span className="text-yellow-600">Queued</span>
            <span>-</span>
          </div>
          <div className="border p-3 rounded grid grid-cols-5 text-sm">
            <span>HPC-2023-40</span>
            <span>Analysis</span>
            <span>user3</span>
            <span className="text-blue-600">Completed</span>
            <span>2h 15m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HPC;
