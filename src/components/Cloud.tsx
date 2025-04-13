
import React from 'react';

const Cloud = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cloud Resources</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Cloud services dashboard</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-medium">AWS</h3>
            <p>Not connected</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">Azure</h3>
            <p>Not connected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cloud;
