import { useState } from 'react';
import { SuppliersService } from '../services/suppliers.service';
import { SupplierDTO } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  supplier: SupplierDTO | null;
}

export default function DeleteSupplierModal({ isOpen, onClose, onSuccess, supplier }: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !supplier) return null;

  const handleDelete = async () => {
    setLoading(true);
    await SuppliersService.deleteSupplier(supplier.id);
    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#101828] p-6 rounded-xl border border-red-500/30 text-white w-full max-w-sm">
        <h2 className="text-xl font-bold mb-2 text-red-500">Eliminar Proveedor</h2>
        <p className="text-gray-300 mb-6 text-sm">
          ¿Estás seguro de que deseas eliminar a <strong>{supplier.name}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition">Cancelar</button>
          <button onClick={handleDelete} disabled={loading} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition">
            {loading ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}