
import React from 'react';

const Gallery = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resource Gallery</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Available Templates</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image Preview</span>
            </div>
            <div className="p-3">
              <h3 className="font-medium">Ubuntu Server 22.04</h3>
              <p className="text-sm text-gray-600">Base server configuration</p>
            </div>
          </div>
          <div className="border rounded overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image Preview</span>
            </div>
            <div className="p-3">
              <h3 className="font-medium">Windows Server 2022</h3>
              <p className="text-sm text-gray-600">Standard configuration</p>
            </div>
          </div>
          <div className="border rounded overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image Preview</span>
            </div>
            <div className="p-3">
              <h3 className="font-medium">CentOS 9</h3>
              <p className="text-sm text-gray-600">Minimal installation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
