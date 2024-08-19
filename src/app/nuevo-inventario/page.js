"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import FormInventario from "../nuevo-inventario/components/FormInventario";
import Sidebar from "@/components/Sidebar";
import { GetCategorias, GetProveedores, CreateInventarioIten } from "@/services/inventario"; 
import Notification from "@/components/Notification";
const Header = ({ toggleSidebar }) => (
  <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
    <button onClick={toggleSidebar} className="lg:hidden">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <h1 className="text-xl font-bold">ContaSoft</h1>
  </header>
);

export default function InventarioCrear() {
  const router = useRouter();
  const formRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await GetCategorias();
        const providersData = await GetProveedores();
        setCategories(categoriesData);
        setProviders(providersData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setNotification({ type: 'error', message: 'Error al cargar los datos' });
      }
    }

    fetchData();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = async (formData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      console.log("Elemto incertado correctamente",formData);
      setNotification({ type: 'success', message: 'Inventario creado con éxito' });
     
     
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error al crear el inventario:', error);
      setNotification({ type: 'error', message: 'Error al crear el inventario' });
    } finally {
      setIsSubmitting(false);
    }
   
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 justify-center items-center">
          <FormInventario
            title="Crear Inventario"
            name="Nombre"
            category="Categoría"
            quantity="Cantidad"
            provider="Proveedor"
            price="Precio"
            observation="Observación"
            btnLimpiar="Limpiar"
            btnEnviar="Enviar"
            isEditing={false}
            onSubmit={handleSubmit}
            onReset={() => console.log("Formulario reiniciado")}
            categories={categories}
            providers={providers}
            formRef={formRef}
          />
        </div>
      </div>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

