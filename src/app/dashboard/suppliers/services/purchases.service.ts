import { purchasesApi } from '../api/purchases';
import { PurchaseDTO } from '../types';

export const PurchasesService = {
    getPurchases: () => purchasesApi.getAll(),
    registerPurchase: (data: Partial<PurchaseDTO>) => purchasesApi.create(data),
    updatePurchase: (id: number, data: Partial<PurchaseDTO>) => purchasesApi.update(id, data),
    deletePurchase: (id: number) => purchasesApi.remove(id),
    getReport: (supplierId: string, start: string, end: string) =>
        purchasesApi.getReport(supplierId, start, end),
};