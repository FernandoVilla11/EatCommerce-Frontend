import { useState } from 'react';
import { PurchasesService } from '../services/purchases.service';
import { PurchaseReportDTO } from '../types';

export default function PurchaseReportSection({ supplierId }: { supplierId: string }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState<PurchaseReportDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) return alert('Selecciona ambas fechas');
    setLoading(true);
    const data = await PurchasesService.getReport(supplierId, startDate, endDate);
    setReport(data);
    setLoading(false);
  };

  return (
    <div className="mt-6 bg-[#101828]/80 p-6 rounded-xl border border-white/10 text-white shadow-xl">
      <h3 className="text-lg font-semibold mb-4">Generar Reporte</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Fecha Inicio</label>
          <input type="date" className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-gray-300 color-scheme-dark" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Fecha Fin</label>
          <input type="date" className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-gray-300 color-scheme-dark" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <button onClick={handleGenerateReport} disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
          {loading ? 'Generando...' : 'Ver Reporte'}
        </button>
      </div>

      {report && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg grid grid-cols-2 gap-4 border border-white/10">
          <div>
            <div className="text-sm text-gray-400">Total de Compras</div>
            <div className="text-2xl font-bold">{report.totalPurchases}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Gastado</div>
            <div className="text-2xl font-bold text-emerald-400">${report.totalSpent.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}