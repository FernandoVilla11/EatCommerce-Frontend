import { suppliersApi } from '../api/suppliers';
import { SupplierDTO } from '../types';

export const SuppliersService = {
  getSuppliers: () => suppliersApi.getAll(),
  createSupplier: (data: Partial<SupplierDTO>) => suppliersApi.create(data),
  updateSupplier: (id: string, data: Partial<SupplierDTO>) => suppliersApi.update(id, data),
  deleteSupplier: (id: string) => suppliersApi.delete(id),
};