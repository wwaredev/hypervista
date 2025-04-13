
import React from 'react';

const Documentation = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Documentation</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">System Documentation</p>
        <div className="space-y-3">
          <div className="border p-4 rounded">
            <h3 className="font-medium">User Guides</h3>
            <p className="text-sm text-gray-600 mt-1">Getting started with system configuration</p>
            <a href="#" className="text-blue-600 hover:underline text-sm block mt-2">View Documentation</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">API Reference</h3>
            <p className="text-sm text-gray-600 mt-1">Complete API documentation for developers</p>
            <a href="#" className="text-blue-600 hover:underline text-sm block mt-2">View API Docs</a>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">Troubleshooting</h3>
            <p className="text-sm text-gray-600 mt-1">Common issues and resolutions</p>
            <a href="#" className="text-blue-600 hover:underline text-sm block mt-2">View Troubleshooting Guide</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
