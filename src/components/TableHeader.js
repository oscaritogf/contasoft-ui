import React from 'react';
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export function TableHeader({ title, buttonAdd, activeTab, onTabChange, selectedFilter, onFilterChange, categorias, proveedores }) {
  const tabs = ["Todos", "Categoria", "Proveedor", "Prestados"];

  return (
    <div className="p-4 bg-white shadow rounded-t-lg">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <h5 className="text-2xl font-bold text-gray-900">{title}</h5>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/nuevo-inventario" passHref>
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <UserPlusIcon className="h-4 w-4" />
              {buttonAdd}
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Categoria" && (
          <select 
            value={selectedFilter} 
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id_categoria} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
        )}
        {activeTab === "Proveedor" && (
          <select 
            value={selectedFilter} 
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Todos los proveedores</option>
            {proveedores.map(prov => (
              <option key={prov.id_proveedor} value={prov.nombre}>{prov.nombre}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
