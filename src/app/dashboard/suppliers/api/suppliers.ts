import { SupplierDTO } from '../types';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        // Cliente: URL relativa funciona
        return '';
    }
    // Servidor: necesita URL absoluta
    return process.env.NEXTAUTH_URL || 'http://localhost:3000';
};

export const suppliersApi = {
    getAll: async (): Promise<SupplierDTO[]> => {
        const res = await fetch(`${getBaseUrl()}/api/suppliers`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al obtener proveedores');
        return res.json();
    },

    create: async (data: Partial<SupplierDTO>): Promise<SupplierDTO> => {
        const res = await fetch(`${getBaseUrl()}/api/suppliers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al crear proveedor');
        return res.json();
    },

    update: async (id: string | number, data: Partial<SupplierDTO>): Promise<SupplierDTO> => {
        const res = await fetch(`${getBaseUrl()}/api/suppliers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al actualizar proveedor');
        return res.json();
    },

    delete: async (id: string | number): Promise<void> => {
        const res = await fetch(`${getBaseUrl()}/api/suppliers/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Error al eliminar proveedor');
    },
};