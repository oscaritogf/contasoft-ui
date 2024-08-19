import Link from 'next/link';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={` bg-blue-500 text-white w-64 h-screen p-4 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-10`}>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-white mr-3"></div>
          <span className="font-semibold">Tesorero</span>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          <li><Link href="/inicio" className="block py-2 px-4 hover:bg-blue-600 rounded">Inicio</Link></li>
          <li><Link href="/transaccion" className="block py-2 px-4 hover:bg-blue-600 rounded">Transacción</Link></li>
          <li><Link href="/" className="block py-2 px-4 hover:bg-blue-500 rounded">Inventario</Link></li>
          <li><Link href="/informes" className="block py-2 px-4 hover:bg-blue-600 rounded">Informes</Link></li>
          <li><Link href="/usuarios" className="block py-2 px-4 hover:bg-blue-600 rounded">Usuarios</Link></li>
        </ul>
      </nav>
      
      <div className="flex-grow pt-4 my-7">
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Sidebar;