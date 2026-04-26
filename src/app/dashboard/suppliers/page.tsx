'use client';
import { useState } from 'react';
import { useSuppliers } from './hooks/useSuppliers';
import SupplierTable from './components/SupplierTable';
import CreateSupplierModal from './components/CreateSupplierModal';
import EditSupplierModal from './components/EditSupplierModal';
import DeleteSupplierModal from './components/DeleteSupplierModal';
import PurchasesSection from './components/PurchasesSection';
import PurchaseReportSection from './components/PurchaseReportSection';
import { SupplierDTO } from './types';

export default function SuppliersPage() {
  const { suppliers, loading, refetch } = useSuppliers();
  
  // Estados para los modales
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<SupplierDTO | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<SupplierDTO | null>(null);
  
  // Estado para la vista de compras
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);

  if (loading) return <div className="p-8 text-white min-h-screen flex items-center justify-center">Cargando proveedores...</div>;

  return (
    <div className="p-6 md:p-8 min-h-screen text-white bg-gradient-to-br from-[#0B1120] to-[#101828]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Proveedores</h1>
          <p className="text-gray-400 text-sm mt-1">Gestiona tus proveedores y su historial de compras.</p>
        </div>
        <button 
          onClick={() => setCreateOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/20"
        >
          + Nuevo Proveedor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SupplierTable 
            suppliers={suppliers} 
            onEdit={setSupplierToEdit}
            onDelete={setSupplierToDelete}
            onSelectPurchases={setSelectedSupplierId}
          />
        </div>

        <div className="lg:col-span-1">
          {selectedSupplierId ? (
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-emerald-400 mb-4">
                Detalles del Proveedor
              </h2>
              <PurchasesSection supplierId={selectedSupplierId} />
              <PurchaseReportSection supplierId={selectedSupplierId} />
            </div>
          ) : (
            <div className="bg-[#101828]/50 border border-white/10 rounded-xl p-8 text-center text-gray-500 sticky top-8">
              Selecciona "Compras" en un proveedor para ver su historial y reportes.
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <CreateSupplierModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} onSuccess={refetch} />
      <EditSupplierModal isOpen={!!supplierToEdit} onClose={() => setSupplierToEdit(null)} onSuccess={refetch} supplier={supplierToEdit} />
      <DeleteSupplierModal isOpen={!!supplierToDelete} onClose={() => setSupplierToDelete(null)} onSuccess={() => { refetch(); setSelectedSupplierId(null); }} supplier={supplierToDelete} />
    </div>
  );
}