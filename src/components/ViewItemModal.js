export function ViewItemModal({ isOpen, onClose, item }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Detalles del Item</h2>
          {/* Mostrar detalles del item */}
          <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Cerrar
          </button>
        </div>
      </div>
    );
  }