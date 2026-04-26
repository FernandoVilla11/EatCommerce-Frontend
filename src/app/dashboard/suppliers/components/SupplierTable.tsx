import { SupplierDTO } from '../types';

interface Props {
  suppliers: SupplierDTO[];
  onEdit: (s: SupplierDTO) => void;
  onDelete: (s: SupplierDTO) => void;
  onSelectPurchases: (id: string) => void;
}

export default function SupplierTable({ suppliers, onEdit, onDelete, onSelectPurchases }: Props) {
  return (
    <div className="bg-[#101828]/50 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto shadow-2xl">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-gradient-to-r from-[#101828] to-[#00897B] text-white border-b border-white/10">
          <tr>
            <th className="p-4 font-semibold">Nombre</th>
            <th className="p-4 font-semibold">Contacto</th>
            <th className="p-4 font-semibold">Dirección</th>
            <th className="p-4 font-semibold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {suppliers.length === 0 ? (
            <tr><td colSpan={4} className="p-8 text-center text-gray-400">No hay proveedores registrados</td></tr>
          ) : (
            suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors text-gray-300">
                <td className="p-4 text-white font-medium">{s.name}</td>
                <td className="p-4">
                  <div className="text-sm">{s.email}</div>
                  <div className="text-xs text-gray-500">{s.phone}</div>
                </td>
                <td className="p-4 text-sm">{s.address}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button onClick={() => onSelectPurchases(s.id)} className="text-blue-400 hover:text-blue-300 text-sm">Compras</button>
                  <button onClick={() => onEdit(s)} className="text-emerald-400 hover:text-emerald-300 text-sm">Editar</button>
                  <button onClick={() => onDelete(s)} className="text-red-400 hover:text-red-300 text-sm">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}