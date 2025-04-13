
import React from 'react';

const Security = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Security Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Security Status</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border p-4 rounded bg-green-50">
            <h3 className="font-medium">Threat Level</h3>
            <p className="text-xl">Low</p>
          </div>
          <div className="border p-4 rounded bg-green-50">
            <h3 className="font-medium">Active Policies</h3>
            <p className="text-xl">12</p>
          </div>
          <div className="border p-4 rounded bg-yellow-50">
            <h3 className="font-medium">Open Alerts</h3>
            <p className="text-xl">3</p>
          </div>
        </div>
        <div className="space-y-3 mb-4">
          <h3 className="font-medium">Recent Security Events</h3>
          <div className="border p-3 rounded grid grid-cols-4 text-sm font-medium bg-gray-50">
            <span>Time</span>
            <span>Source</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          <div className="border p-3 rounded grid grid-cols-4 text-sm">
            <span>12:45 PM</span>
            <span>192.168.1.45</span>
            <span>Login attempt</span>
            <span className="text-green-600">Allowed</span>
          </div>
          <div className="border p-3 rounded grid grid-cols-4 text-sm">
            <span>11:23 AM</span>
            <span>203.0.113.5</span>
            <span>Port scan</span>
            <span className="text-red-600">Blocked</span>
          </div>
          <div className="border p-3 rounded grid grid-cols-4 text-sm">
            <span>09:17 AM</span>
            <span>10.0.1.102</span>
            <span>File access</span>
            <span className="text-yellow-600">Warning</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default Security;
