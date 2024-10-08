
//src/app/nuevo-inventario/components/ModalUpdate.js
export default function ModalUpdate({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <button onClick={onClose} className="float-right">X</button>
          {children}
        </div>
      </div>
    );
  }