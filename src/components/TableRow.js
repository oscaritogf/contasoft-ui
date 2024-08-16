import { PencilIcon, EyeIcon, HandRaisedIcon } from "@heroicons/react/24/solid";

export function TableRow({ item, isLast, onView, onLend }) {
  const { 
    id_inventario,
    nombre_inventario, 
    cantidad, 
    precio, 
    observacion, 
    nombre_categoria, 
    nombre_proveedor, 
    esta_prestado, 
    veces_prestado 
  } = item;
  
  const rowClass = isLast ? "p-4" : "p-4 border-b border-gray-200";
  const cellClass = "px-6 py-4 whitespace-nowrap";

  return (
    <tr>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="font-semibold text-gray-900">{nombre_inventario}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">{cantidad}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">${precio.toFixed(2)}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">{observacion}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">{nombre_categoria}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">{nombre_proveedor}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">{esta_prestado ? 'Sí' : 'No'}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <p className="text-sm text-gray-600">{veces_prestado}</p>
      </td>
      <td className={`${rowClass} ${cellClass}`}>
        <div className="flex space-x-2">
          <button onClick={() => onView(id_inventario)} className="text-blue-600 hover:text-blue-800">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button onClick={() => onLend(id_inventario)} className="text-green-600 hover:text-green-800">
            <HandRaisedIcon className="h-5 w-5" />
          </button>
        
        </div>
      </td>
    </tr>
  );
}