//src/app/inventario/[id]/page.js
"use client";

import React, { useState, useEffect } from "react";
//import { useRouter } from 'next/router';
import FormInventario from "../../nuevo-inventario/components/FormInventario";
import Sidebar from "@/components/Sidebar";
import {
  GetInventarioIten,
  GetCategorias,
  GetProveedores,
  ArchivarInventarioItem
} from "@/services/inventario";
import InfoCard from "../../nuevo-inventario/components/InfoCard";
import ModalUpdate from "../../nuevo-inventario/components/ModalUpdate";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "../../../utils/errors";
import Notification from "@/components/Notification";
import ConfirmArchiveModal from "@/components/ConfirmArchiveModal";


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

export default function InventarioUpdate(props) {
  const { id } = props.params;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [providerName, setProviderName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const item = await GetInventarioIten(id);
        setItemData(item);

        const providerData = await GetProveedores();
        setProviders(providerData);

        const categoryData = await GetCategorias();
        setCategories(categoryData);

        if (providerData && providerData.length > 0) {
          const provider = providerData.find(
            (provider) => provider.id_proveedor === item.id_proveedor
          );
          setProviderName(provider ? provider.nombre : "Desconocido");
        }

        if (categoryData && categoryData.length > 0) {
          const category = categoryData.find(
            (category) => category.id_categoria === item.id_categoria
          );
          setCategoryName(category ? category.nombre : "Desconocido");
        }
      } catch (error) {
        const errorsResponse = ErrorResponse(error);
        if (errorsResponse !== "") {
          router.push(errorsResponse);
        }
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, [router, id]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleArchiveClick = () => {
    if (itemData.esta_prestado) {
      setNotification({
        type: "error",
        message: "No se puede archivar un ítem que está prestado.",
      });
    } else {
      setIsArchiveModalOpen(true);
    }
  };

  const handleArchiveConfirm = async () => {
    try {
      await  ArchivarInventarioItem(id);
      setNotification({
        type: "success",
        message: "El ítem ha sido archivado con éxito.",
      });
      setIsArchiveModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error al archivar el ítem:", error);
      setNotification({
        type: "error",
        message: "Error al archivar el ítem.",
      });
    }
  };

  const handleSubmit = (formData) => {
    try {
     
      console.log("Datos actualizados:", formData);
      setIsModalOpen(false);
      setNotification({
        type: "success",
        message: "Inventario actualizado con éxito",
      });
      router.push("/");
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      setNotification({
        type: "error",
        message: "Error al actualizar el inventario",
      });
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
        <div className="flex flex-1 justify-center items-center p-4">
          {itemData && (
            <InfoCard
              title={itemData.nombre}
              provider={providerName}
              category={categoryName}
              quantity={itemData.cantidad}
              price={itemData.precio}
              observations={itemData.observacion}
              timesBorrowed={itemData.veces_prestado}
              isBorrowed={itemData.esta_prestado}
              archived={itemData.archivado}
              onEditClick={handleEditClick}
              onArchiveClick={handleArchiveClick}
            />
          )}
        </div>
      </div>
      <ModalUpdate isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormInventario
          title="Editar Inventario"
          name="Nombre"
          category="Categoría"
          quantity="Cantidad"
          provider="Proveedor"
          price="Precio"
          observation="Observación"
          btnLimpiar="Cancelar"
          btnEnviar="Actualizar"
          isEditing={true}
          onSubmit={handleSubmit}
          onReset={() => setIsModalOpen(false)}
          initialData={itemData}
          providers={providers}
          categories={categories}
        />
      </ModalUpdate>
      
      <ConfirmArchiveModal 
        isOpen={isArchiveModalOpen} 
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleArchiveConfirm}
      />

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
