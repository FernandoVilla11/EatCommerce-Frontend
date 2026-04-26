import { useState } from 'react';
import { usePurchases } from '../hooks/usePurchases';

export default function PurchasesSection({ supplierId }: { supplierId: string }) {
  const { purchases, loading } = usePurchases();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const supplierPurchases = purchases.filter(p => p.supplierId === supplierId);

  if (loading) return <div className="text-gray-400 p-4 text-sm">Cargando historial...</div>;

  return (
    <div className="mt-8 bg-[#101828]/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
      <div className="p-4 bg-white/5 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Historial con Detalle</h3>
      </div>
      
      {supplierPurchases.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-500">No hay compras registradas para este proveedor.</div>
      ) : (
        <div className="divide-y divide-white/5">
          {supplierPurchases.map(purchase => (
            <div key={purchase.id} className="p-4 hover:bg-white/5 transition-all">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedId(expandedId === purchase.id ? null : purchase.id)}
              >
                <div>
                  <p className="text-xs text-gray-500">{new Date(purchase.date).toLocaleDateString()}</p>
                  <p className="text-emerald-400 font-bold">${purchase.totalAmount.toLocaleString()}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {expandedId === purchase.id ? '▲ Cerrar' : '▼ Ver productos'}
                </span>
              </div>

              {/* EL PLUS: Mostramos los productos si el backend los envía */}
              {expandedId === purchase.id && purchase.products && purchase.products.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-1">
                  <p className="text-[10px] uppercase text-gray-500 mb-2">Productos comprados:</p>
                  {purchase.products.map((prod, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1">
                      <span className="text-gray-300">{prod.productName} (x{prod.quantity})</span>
                      <span className="text-gray-400">${(prod.unitPrice * prod.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}