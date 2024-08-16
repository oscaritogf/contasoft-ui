import { useState, useEffect } from 'react';
import React from 'react';
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { GetInventario, GetCategorias, GetProveedores } from "../services/inventario";
import { ViewItemModal } from "../components/ViewItemModal";
import { LendItemModal } from "../components/LendItemModal";

const TABLE_HEAD = ["Nombre", "Cantidad", "Precio", "Observación", "Categoría", "Proveedor", "Prestado", "Cantidad Prestado", "Acciones"];
const ITEMS_PER_PAGE = 5;

export function ContasoftTable() {
    const [inventario, setInventario] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [lendModalOpen, setLendModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeTab, setActiveTab] = useState("Todos");
    const [filteredInventario, setFilteredInventario] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inventarioData, categoriasData, proveedoresData] = await Promise.all([
                    GetInventario(),
                    GetCategorias(),
                    GetProveedores()
                ]);
                setInventario(inventarioData);
                setCategorias(categoriasData);
                setProveedores(proveedoresData);
                setFilteredInventario(inventarioData);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterInventario();
    }, [activeTab, selectedFilter, inventario]);

    const filterInventario = () => {
        let filtered = inventario;
        
        switch (activeTab) {
            case "Todos":
                filtered = inventario;
                break;
            case "Categoria":
                if (selectedFilter) {
                    filtered = inventario.filter(item => item.nombre_categoria === selectedFilter);
                }
                break;
            case "Proveedor":
                if (selectedFilter) {
                    filtered = inventario.filter(item => item.nombre_proveedor === selectedFilter);
                }
                break;
            case "Prestados":
                filtered = inventario.filter(item => item.esta_prestado);
                break;
            default:
                filtered = inventario;
        }
        
        setFilteredInventario(filtered);
        setCurrentPage(1);  
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedFilter("");
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    function handleViewItem(id) {
        const item = inventario.find(i => i.id_inventario === id);
        setSelectedItem(item);
        setViewModalOpen(true);
    }
    
    function handleLendItem(id) {
        const item = inventario.find(i => i.id_inventario === id);
        setSelectedItem(item);
        setLendModalOpen(true);
    }

    
    const totalPages = Math.ceil(filteredInventario.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredInventario.slice(startIndex, endIndex);

    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-white shadow rounded-lg">
            <TableHeader
                activeTab={activeTab} 
                onTabChange={handleTabChange}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
                categorias={categorias}
                proveedores={proveedores}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((item, index) => (
                            <TableRow
                                key={item.id_inventario}
                                item={item}
                                isLast={index === currentItems.length - 1}
                                onView={handleViewItem}
                                onLend={handleLendItem}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button 
                        onClick={goToPreviousPage} 
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Anterior
                    </button>
                    <button 
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Siguiente
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{startIndex + 1}</span> a {" "}
                            <span className="font-medium">{Math.min(endIndex, filteredInventario.length)}</span> de {" "}
                            <span className="font-medium">{filteredInventario.length}</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button 
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                Anterior
                            </button>
                            <button 
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                Siguiente 
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <ViewItemModal 
                isOpen={viewModalOpen} 
                onClose={() => setViewModalOpen(false)} 
                item={selectedItem} 
            />
            <LendItemModal 
                isOpen={lendModalOpen} 
                onClose={() => setLendModalOpen(false)} 
                item={selectedItem} 
            />
        </div>
    );
}