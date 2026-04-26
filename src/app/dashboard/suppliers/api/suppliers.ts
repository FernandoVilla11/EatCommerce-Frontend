import { SupplierDTO } from '../types';

// Usamos la URL de tu config o la del entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const BASE_URL = `${API_URL}/api/suppliers`;

export const suppliersApi = {
  getAll: async (): Promise<SupplierDTO[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener proveedores');
    return res.json();
  },

  create: async (data: Partial<SupplierDTO>): Promise<SupplierDTO> => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: string, data: Partial<SupplierDTO>): Promise<SupplierDTO> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  },
};