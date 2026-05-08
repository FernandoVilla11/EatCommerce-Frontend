'use client';

import { useState, useEffect } from 'react';
import { PurchasesService } from '../services/purchases.service';
import { PurchaseDTO, PurchaseProductDTO } from '../types';

interface PurchaseItem {
    itemName: string;
    quantity: number;
    unitPrice: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    purchase: PurchaseDTO | null;
}

export default function EditPurchaseModal({ isOpen, onClose, onSuccess, purchase }: Props) {
    const [items, setItems] = useState<PurchaseItem[]>([]);
    const [concept, setConcept] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (purchase) {
            setConcept(purchase.concept || '');
            setPurchaseDate(purchase.date || '');
            setItems(
                (purchase.items || []).map(i => ({
                    itemName: i.itemName,
                    quantity: i.quantity,
                    unitPrice: i.unitPrice,
                }))
            );
        }
    }, [purchase]);

    const addItem = () => setItems([...items, { itemName: '', quantity: 1, unitPrice: 0 }]);
    const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
    const updateItem = (index: number, field: keyof PurchaseItem, value: any) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: field === 'itemName' ? value : Number(value) };
        setItems(updated);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    const handleClose = () => {
        setError(null);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!purchase) return;
        if (items.length === 0) { setError('Agrega al menos un insumo'); return; }
        if (items.some(i => !i.itemName.trim())) { setError('Todos los insumos deben tener nombre'); return; }

        setLoading(true);
        setError(null);
        try {
            await PurchasesService.updatePurchase(purchase.id, {
                supplierId: purchase.supplierId,
                purchaseDate: `${purchaseDate}T00:00:00`,
                concept,
                items,
            });
            onSuccess();
            handleClose();
        } catch (err: any) {
            setError(err.message || 'Error al actualizar compra');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !purchase) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#101828] p-6 rounded-xl border border-white/10 text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold">Editar Compra</h2>
                        <p className="text-xs text-gray-500 mt-1">ID: #{purchase.id}</p>
                    </div>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white text-xl">X</button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Concepto</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500 text-sm"
                                value={concept}
                                onChange={(e) => setConcept(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Fecha</label>
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-emerald-500 text-sm"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm text-gray-400">Insumos</label>
                            <button
                                type="button"
                                onClick={addItem}
                                className="text-xs bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition"
                            >
                                + Agregar insumo
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="text-center py-6 border border-dashed border-white/10 rounded-lg text-sm text-gray-500">
                                No hay insumos. Haz clic en Agregar insumo.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 px-1">
                                    <div className="col-span-5">Nombre del insumo</div>
                                    <div className="col-span-2">Cantidad</div>
                                    <div className="col-span-3">Precio unit.</div>
                                    <div className="col-span-2 text-center">Subtotal</div>
                                </div>
                                {items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 items-center bg-white/5 p-3 rounded-lg border border-white/10">
                                        <div className="col-span-5">
                                            <input
                                                className="w-full bg-[#0d1f33] border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-emerald-500"
                                                value={item.itemName}
                                                onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                                                placeholder="Ej: Carne de res"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-full bg-[#0d1f33] border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-emerald-500"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="w-full bg-[#0d1f33] border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-emerald-500"
                                                value={item.unitPrice}
                                                onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-2 flex items-center justify-between px-1">
                                            <span className="text-xs text-emerald-400">
                                                ${(item.quantity * item.unitPrice).toLocaleString()}
                                            </span>
                                            <button type="button" onClick={() => removeItem(index)} className="text-red-400 hover:text-red-300 text-xs ml-1">X</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="flex justify-end pt-2 border-t border-white/10">
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Total de la compra</p>
                                <p className="text-2xl font-bold text-emerald-400">${totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={handleClose} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-sm">Cancelar</button>
                        <button type="submit" disabled={loading || items.length === 0} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition text-sm font-medium disabled:opacity-50">
                            {loading ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}