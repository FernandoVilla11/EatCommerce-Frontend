import { PurchaseDTO, PurchaseReportDTO } from '../types';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return '';
    }
    return process.env.NEXTAUTH_URL || 'http://localhost:3000';
};

export const purchasesApi = {
    getAll: async (): Promise<PurchaseDTO[]> => {
        const res = await fetch(`${getBaseUrl()}/api/purchases`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al obtener compras');
        return res.json();
    },

    create: async (data: Partial<PurchaseDTO>): Promise<PurchaseDTO> => {
        const res = await fetch(`${getBaseUrl()}/api/purchases`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al registrar compra');
        return res.json();
    },

    getReport: async (supplierId: string, start: string, end: string): Promise<PurchaseReportDTO> => {
        const res = await fetch(
            `${getBaseUrl()}/api/purchases/report?supplierId=${supplierId}&start=${start}&end=${end}`,
            { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('Error al obtener reporte');
        return res.json();
    },
};