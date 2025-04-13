
import React from 'react';

const Storage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Storage Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Storage Volumes</p>
        <div className="space-y-4 mb-6">
          <div className="border p-4 rounded">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Production Storage</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>75% used</span>
              <span>750GB / 1TB</span>
            </div>
          </div>
          <div className="border p-4 rounded">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Backup Storage</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-2/5"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>40% used</span>
              <span>2TB / 5TB</span>
            </div>
          </div>
          <div className="border p-4 rounded">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Archive Storage</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Syncing</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-4/5"></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>80% used</span>
              <span>8TB / 10TB</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Add Storage
        </button>
      </div>
    </div>
  );
};

export default Storage;
