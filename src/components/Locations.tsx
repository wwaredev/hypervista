
import React from 'react';

const Locations = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Locations Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Data Center Locations</p>
        <div className="space-y-3">
          <div className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-medium">New York</h3>
              <p className="text-sm text-gray-600">US East</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          <div className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-medium">San Francisco</h3>
              <p className="text-sm text-gray-600">US West</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          <div className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-medium">London</h3>
              <p className="text-sm text-gray-600">EU West</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          <div className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-medium">Singapore</h3>
              <p className="text-sm text-gray-600">Asia Pacific</p>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
