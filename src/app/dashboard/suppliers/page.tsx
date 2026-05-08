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

    const [isCreateOpen, setCreateOpen] = useState(false);
    const [supplierToEdit, setSupplierToEdit] = useState<SupplierDTO | null>(null);
    const [supplierToDelete, setSupplierToDelete] = useState<SupplierDTO | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierDTO | null>(null);

    if (loading) return (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
            Cargando proveedores...
        </div>
    );

    return (
        <div className="p-6 md:p-8 min-h-screen text-white bg-gradient-to-br from-[#0B1120] to-[#101828]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Proveedores</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Gestiona tus proveedores y su historial de compras.
                    </p>
                </div>
                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/20"
                >
                    + Nuevo Proveedor
                </button>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tabla de proveedores */}
                <div className="lg:col-span-2">
                    <SupplierTable
                        suppliers={suppliers}
                        onEdit={setSupplierToEdit}
                        onDelete={setSupplierToDelete}
                        onSelectPurchases={(id) => {
                            console.log("Buscando proveedor con id:", id, "en:", suppliers);
                            const supplier = suppliers.find(s => String(s.id) === id);
                            console.log("Proveedor encontrado:", supplier);
                            setSelectedSupplier(supplier ?? null);
                        }}
                    />
                </div>

                {/* Panel lateral */}
                <div className="lg:col-span-1">
                    {selectedSupplier ? (
                        <div className="sticky top-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-emerald-400">
                                    {selectedSupplier.name}
                                </h2>
                                <button
                                    onClick={() => setSelectedSupplier(null)}
                                    className="text-xs text-gray-500 hover:text-gray-300 transition"
                                >
                                    ✕ Cerrar
                                </button>
                            </div>

                            {/* Info del proveedor */}
                            <div className="bg-[#101828]/80 border border-white/10 rounded-xl p-4 mb-4 text-sm space-y-2">
                                {selectedSupplier.email && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Email</span>
                                        <span className="text-gray-200">{selectedSupplier.email}</span>
                                    </div>
                                )}
                                {selectedSupplier.phone && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Teléfono</span>
                                        <span className="text-gray-200">{selectedSupplier.phone}</span>
                                    </div>
                                )}
                                {selectedSupplier.address && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Dirección</span>
                                        <span className="text-gray-200">{selectedSupplier.address}</span>
                                    </div>
                                )}
                                {selectedSupplier.nit && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">NIT</span>
                                        <span className="text-gray-200">{selectedSupplier.nit}</span>
                                    </div>
                                )}
                            </div>

                            <PurchasesSection
                                supplierId={String(selectedSupplier.id)}
                                supplierName={selectedSupplier.name}
                            />
                            <PurchaseReportSection
                                supplierId={String(selectedSupplier.id)}
                            />
                        </div>
                    ) : (
                        <div className="bg-[#101828]/50 border border-white/10 rounded-xl p-8 text-center text-gray-500 sticky top-8">
                            <p className="text-4xl mb-3">🏢</p>
                            <p className="text-sm">Selecciona "Compras" en un proveedor para ver su historial y reportes.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modales */}
            <CreateSupplierModal
                isOpen={isCreateOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={refetch}
            />
            <EditSupplierModal
                isOpen={!!supplierToEdit}
                onClose={() => setSupplierToEdit(null)}
                onSuccess={refetch}
                supplier={supplierToEdit}
            />
            <DeleteSupplierModal
                isOpen={!!supplierToDelete}
                onClose={() => setSupplierToDelete(null)}
                onSuccess={() => {
                    refetch();
                    setSelectedSupplier(null);
                }}
                supplier={supplierToDelete}
            />
        </div>
    );
}