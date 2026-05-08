'use client';

import { useState } from 'react';
import { PurchasesService } from '../services/purchases.service';
import { PurchaseDTO } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    purchase: PurchaseDTO | null;
}

export default function DeletePurchaseModal({ isOpen, onClose, onSuccess, purchase }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen || !purchase) return null;

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await PurchasesService.deletePurchase(purchase.id);
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al eliminar compra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#101828] p-6 rounded-xl border border-red-500/30 text-white w-full max-w-sm">
                <h2 className="text-xl font-bold mb-1 text-red-400">Eliminar Compra</h2>
                <p className="text-xs text-gray-500 mb-4">ID: #{purchase.id}</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Concepto</span>
                        <span className="text-gray-200">{purchase.concept}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Fecha</span>
                        <span className="text-gray-200">{new Date(purchase.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Total</span>
                        <span className="text-emerald-400 font-bold">${purchase.totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                <p className="text-gray-300 text-sm mb-6">
                    ¿Estás seguro de que deseas eliminar esta compra? Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm disabled:opacity-50"
                    >
                        {loading ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}