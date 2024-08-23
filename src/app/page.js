//src/app/page.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContasoftCard from "@/components/ContasoftCard";
import { ContasoftTable } from "@/components/ContasoftTable";
import Sidebar from '@/components/Sidebar';
import { GetInventarioElementos, GetPrestamoElementos, GetConEntrega, GetUsuariosEntrega} from "@/services/inventario";
import { useRouter } from 'next/navigation';

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

export default function Home() {
  const router = useRouter();
  const [inventarioCount, setInventarioCount] = useState(null);
  const [prestamocount, setPrestamoCount] = useState(null);
  const [entregaCount, setEntregaCount] = useState(null);
  const [usuariosTardios, setUsuariosTardios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/login');
      return;
    }
    async function fetchData() {
      try {
        const inventarioData = await GetInventarioElementos(token);
        const prestamoData = await GetPrestamoElementos(token);
        const entregaData = await GetConEntrega(token);
        const usuariosData = await GetUsuariosEntrega(token);

        setInventarioCount(inventarioData[0].total_elementos);
        setPrestamoCount(prestamoData[0].total_elementos_prestados);
        setEntregaCount(entregaData[0].total_usuarios_tardios); 
        setUsuariosTardios(usuariosData);
      } catch (error) {
        console.error("Error fetching data:", error);
        if(error.message === 'Unauthorized'){
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }
    fetchData();
  }, [router]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const firstUser = usuariosTardios.length > 0 ? usuariosTardios[0] : null;

  return (
    <div className="flex flex-col h-screen">
       <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
       
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <div className="flex flex-1 min-w-[275px] border border-blue-500 rounded-md bg-blue-600 text-white">
              <ContasoftCard
                title="Total Elementos en inventario"
                description={inventarioCount !== null ? inventarioCount : 'Cargando...'}
              />
            </div>
            <div className="flex flex-1 min-w-[275px] border border-blue-500 rounded-md bg-blue-600 text-white">
              <ContasoftCard
                title="Total Elemento prestados"
                description={prestamocount !== null ? prestamocount : 'Cargando...'}
              />
            </div>
            <div className="md:col-span-1 lg:col-span-1 xl:col-span-2 min-w-[275px] border border-blue-500 rounded-md bg-blue-600 text-white">
              <ContasoftCard
                title="Beneficiarios con entregas tardías:"
                description={entregaCount !== null ? entregaCount: 'Cargando...'}
                users={firstUser ? `${firstUser.primer_nombre} ${firstUser.primer_apellido} ${firstUser.email} ${firstUser.telefono}` : ''}
                verMas="Ver más"
                onClick={openModal}
              />
            </div>
            <div className="col-span-full lg:col-span-4 xl:col-span-5 lg:row-span-2">
              <ContasoftTable />
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Beneficiarios con Entregas Tardías</h2>
                <ul>
                  {usuariosTardios.map((user, index) => (
                    <li key={index} className="mb-2">
                      {user.primer_nombre} {user.primer_apellido} - {user.email} - {user.telefono}
                    </li>
                  ))}
                </ul>
                <button onClick={closeModal} className="mt-4 text-blue-500 hover:underline">
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}