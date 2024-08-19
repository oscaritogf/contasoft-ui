import React, { useState } from 'react';

export function LendItemModal({ isOpen, onClose, item }) {
  const [formData, setFormData] = useState({
    accountOrEmployeeNumber: '',
    firstName: '',
    lastName: '',
    loanDate: '',
    returnDate: '',
    amount: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log('Datos del formulario:', formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Registrar nuevo préstamo</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Número de cuenta o empleado</label>
              <input
                type="text"
                name="accountOrEmployeeNumber"
                value={formData.accountOrEmployeeNumber}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Número de cuenta o empleado"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Apellidos</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Apellidos"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Nombres</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Nombres"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Fecha de devolución</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Fecha de devolución"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Fecha prestado</label>
              <input
                type="date"
                name="loanDate"
                value={formData.loanDate}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Fecha prestado"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Cantidad</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="catidad de elementos prestados"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
