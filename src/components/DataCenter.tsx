
import React from 'react';

const DataCenter = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Data Center Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Data center status</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border p-4 rounded bg-green-50">
            <h3 className="font-medium">Temperature</h3>
            <p className="text-xl">22°C</p>
          </div>
          <div className="border p-4 rounded bg-blue-50">
            <h3 className="font-medium">Humidity</h3>
            <p className="text-xl">45%</p>
          </div>
          <div className="border p-4 rounded bg-purple-50">
            <h3 className="font-medium">Power Usage</h3>
            <p className="text-xl">68%</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default DataCenter;
