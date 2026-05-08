export interface SupplierDTO {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    nit?: string;
}

export interface PurchaseProductDTO {
    itemName: string;
    quantity: number;
    unitPrice: number;
}

export interface PurchaseDTO {
    id: number;
    supplierId: number;
    supplierName?: string;
    totalAmount: number;
    date: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    concept?: string;
    items?: PurchaseProductDTO[];
    products?: PurchaseProductDTO[];
}

export interface PurchaseReportDTO {
    supplierId: number;
    supplierName: string;
    totalPurchases: number;
    totalSpent: number;
    periodStart: string;
    periodEnd: string;
}