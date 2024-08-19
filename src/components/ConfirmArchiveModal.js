// src/components/ConfirmArchiveModal.js
import React from 'react';

export default function ConfirmArchiveModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirmar Archivar</h2>
        <p className="mb-6">¿Estás seguro que lo deseas archivar?</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm"
          >
            No
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm"
          >
            Sí, archivar
          </button>
        </div>
      </div>
    </div>
  );
}
