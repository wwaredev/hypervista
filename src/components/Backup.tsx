
import React from 'react';

const Backup = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Backup Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">No backups configured yet.</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Create New Backup
        </button>
      </div>
    </div>
  );
};

export default Backup;
