import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  const [userName, setUserName] = useState('');


useEffect(() => {
  const token = localStorage.getItem('token');
  if(token) {
    try {
      const decodedToken=jwtDecode(token);
      setUserName(`${decodedToken.primer_nombre} ${decodedToken.primer_apellido}`);
    }catch(error) {
      console.error('error al decodificar el token:', error);
    }
  }
}, []);

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');

    // Redirigir al usuario a la página de inicio de sesión o página pública
    router.push('/login');
  };

  return (
    <div className={`bg-blue-500 text-white w-64 h-screen p-4 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-10`}>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-white mr-3"></div>
          <span className="font-semibold">{userName|| 'Tesorero'}</span>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
        <li><Link href="/" className="block py-2 px-4 hover:bg-blue-500 rounded">Inventario</Link></li>
         
        </ul>
      </nav>
      
      <div className="flex-grow pt-4 my-11">
        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
