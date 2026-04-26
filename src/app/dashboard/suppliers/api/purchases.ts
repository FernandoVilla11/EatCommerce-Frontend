import { PurchaseDTO, PurchaseReportDTO } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const BASE_URL = `${API_URL}/api/purchases`;

export const purchasesApi = {
  getAll: async (): Promise<PurchaseDTO[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  // Aquí enviamos la compra con sus productos al backend de tu compañero
  create: async (data: Partial<PurchaseDTO>): Promise<PurchaseDTO> => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getReport: async (supplierId: string, start: string, end: string): Promise<PurchaseReportDTO> => {
    const res = await fetch(`${BASE_URL}/report?supplierId=${supplierId}&start=${start}&end=${end}`);
    return res.json();
  },
};