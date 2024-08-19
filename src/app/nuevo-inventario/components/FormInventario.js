//src/app/nuevo-inventario/components/FormInventario.js

import React, { useState, useEffect } from "react";
import { UpdateInventarioIten, CreateInventarioIten } from "@/services/inventario"; 

export default function FormInventario({
  title,
  name,
  category,
  quantity,
  provider,
  price,
  observation,
  onSubmit,
  onReset,
  btnLimpiar,
  btnEnviar,
  initialData,
  providers,
  categories,
  isEditing,
  formRef,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    cantidad: "",
    proveedor: "",
    precio: "",
    observacion: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        categoria: initialData.id_categoria || "",
        cantidad: initialData.cantidad || "",
        proveedor: initialData.id_proveedor || "",
        precio: initialData.precio || "",
        observacion: initialData.observacion || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.categoria) newErrors.categoria = "La categoría es obligatoria.";
    if (!formData.cantidad || isNaN(formData.cantidad) || formData.cantidad <= 0)
      newErrors.cantidad = "La cantidad debe ser un número positivo.";
    if (!formData.proveedor) newErrors.proveedor = "El proveedor es obligatorio.";
    if (!formData.precio || isNaN(formData.precio) || formData.precio <= 0)
      newErrors.precio = "El precio debe ser un número positivo.";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        if (isEditing && initialData?.id_inventario) {
          // Modo de edición
          await UpdateInventarioIten(
            initialData.id_inventario,
            formData.categoria,
            formData.proveedor,
            formData.nombre,
            formData.cantidad,
            formData.precio,
            formData.observacion
          );
        } else {
          // Modo de creación
          await CreateInventarioIten(
            formData.categoria,
            formData.proveedor,
            formData.nombre,
            formData.cantidad,
            formData.precio,
            formData.observacion
          );
        }
        onSubmit(formData);
      } catch (error) {
        console.error("Error al procesar el inventario:", error);
      }
    }
  };
  

  const handleReset = () => {
    setFormData({
      nombre: "",
      categoria: "",
      cantidad: "",
      proveedor: "",
      precio: "",
      observacion: "",
    });
    setErrors({});
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} ref = {formRef}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {name}
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Nombre"
            />
            {errors.nombre && (
              <span className="text-red-500 text-sm">{errors.nombre}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {category}
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(cat => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            {errors.categoria && (
              <span className="text-red-500 text-sm">{errors.categoria}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {quantity}
            </label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Cantidad"
            />
            {errors.cantidad && (
              <span className="text-red-500 text-sm">{errors.cantidad}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {provider}
            </label>
            <select
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Seleccionar proveedor</option>
              {providers.map(prov => (
                <option key={prov.id_proveedor} value={prov.id_proveedor}>
                  {prov.nombre}
                </option>
              ))}
            </select>
            {errors.proveedor && (
              <span className="text-red-500 text-sm">{errors.proveedor}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {price}
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Precio"
            />
            {errors.precio && (
              <span className="text-red-500 text-sm">{errors.precio}</span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {observation}
            </label>
            <textarea
              name="observacion"
              rows="3"
              value={formData.observacion}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Observación"
            ></textarea>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400"
            onClick={handleReset}
          >
            {btnLimpiar}
          </button>
          <button
           type="submit"
           className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
           disabled={Object.keys(errors).length > 0}
         >
           {btnEnviar}
          </button>
        </div>
      </form>
    </div>
  );
}

