'use client';

import { useState } from 'react';
import { usePurchases } from '../hooks/usePurchases';
import CreatePurchaseModal from './CreatePurchaseModal';

interface Props {
    supplierId: string;
    supplierName: string;
}

export default function PurchasesSection({ supplierId, supplierName }: Props) {
    const { purchases, loading, refetch } = usePurchases();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isCreateOpen, setCreateOpen] = useState(false);

    const supplierPurchases = purchases.filter(
        (p) => String(p.supplierId) === supplierId
    );

    if (loading) return (
        <div className="text-gray-400 p-4 text-sm">Cargando historial...</div>
    );

    return (
        <>
            <div className="mt-8 bg-[#101828]/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Historial con Detalle</h3>
                    <button
                        onClick={() => setCreateOpen(true)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition font-medium"
                    >
                        + Registrar Compra
                    </button>
                </div>

                {supplierPurchases.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500">
                        No hay compras registradas para este proveedor.
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {supplierPurchases.map((purchase) => {
                            const purchaseKey = String(purchase.id);
                            const isExpanded = expandedId === purchaseKey;
                            const items = purchase.items ?? purchase.products ?? [];

                            return (
                                <div key={purchaseKey} className="p-4 hover:bg-white/5 transition-all">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => setExpandedId(isExpanded ? null : purchaseKey)}
                                    >
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                {new Date(purchase.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-300 mt-0.5">
                                                {purchase.concept}
                                            </p>
                                            <p className="text-emerald-400 font-bold mt-0.5">
                                                ${purchase.totalAmount.toLocaleString()}
                                            </p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                                                purchase.status === 'COMPLETED'
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : purchase.status === 'PENDING'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {purchase.status}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {isExpanded ? '▲ Cerrar' : '▼ Ver productos'}
                                        </span>
                                    </div>

                                    {isExpanded && items.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-[10px] uppercase text-gray-500 mb-2">
                                                Insumos comprados:
                                            </p>
                                            {items.map((prod, idx) => (
                                                <div key={idx} className="flex justify-between text-xs py-1">
                                                    <span className="text-gray-300">
                                                        {prod.itemName ?? `Insumo #${idx + 1}`} (x{prod.quantity})
                                                    </span>
                                                    <span className="text-gray-400">
                                                        ${(prod.unitPrice * prod.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {isExpanded && items.length === 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                                            No hay insumos detallados en esta compra.
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <CreatePurchaseModal
                isOpen={isCreateOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={refetch}
                supplierId={Number(supplierId)}
                supplierName={supplierName}
            />
        </>
    );
}