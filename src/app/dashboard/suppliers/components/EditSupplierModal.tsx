'use client';

import { useState, useEffect } from 'react';
import { SuppliersService } from '../services/suppliers.service';
import { SupplierDTO } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    supplier: SupplierDTO | null;
}

export default function EditSupplierModal({ isOpen, onClose, onSuccess, supplier }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        nit: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (supplier) {
            setFormData({
                name: supplier.name,
                email: supplier.email || '',
                phone: supplier.phone || '',
                address: supplier.address || '',
                nit: supplier.nit || '',
            });
        }
    }, [supplier]);

    if (!isOpen || !supplier) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await SuppliersService.updateSupplier(supplier.id, formData);
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al actualizar proveedor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#101828] p-6 rounded-xl border border-white/10 text-white w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Editar Proveedor</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Nombre *</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">NIT</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500"
                            value={formData.nit}
                            onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                            placeholder="Opcional"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Teléfono</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Dirección</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition"
                        >
                            {loading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}