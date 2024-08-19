
//src/app/nuevo-inventario/components/InfoCard.js
import React from 'react';

export default function InfoCard({
  title, 
  provider, 
  category, 
  quantity, 
  price, 
  observations, 
  timesBorrowed, 
  isBorrowed, 
  archived,
  onEditClick,
  onArchiveClick,
}) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-base">Proveedor: {provider}</p>
        <p className="text-base">Categoría: {category}</p>
        <p className="text-base">Cantidad: {quantity}</p>
        <p className="text-base">Precio: Lps. {price}</p>
        <p className="text-base">Observaciones: {observations}</p>
        <p className="text-base">Veces prestado: {timesBorrowed}</p>
        <p className="text-base">Prestado actualmente: {isBorrowed ? "Sí" : "No"}</p>
        <p className="text-base">Archivado: {archived ? "Sí" : "No"}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button 
          className="px-4 py-2 bg-green-300 text-gray-700 rounded-md shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg" 
          onClick={onEditClick} 
          disabled={isBorrowed || archived}
        >
          Editar
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg" 
          onClick={onArchiveClick} 
          disabled={isBorrowed || archived}
        >
          Archivar
        </button>
      </div>
    </div>
  );
}
