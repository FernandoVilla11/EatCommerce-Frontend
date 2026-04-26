export interface SupplierDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt?: string;
}

export interface PurchaseProductDTO {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseDTO {
  id: string;
  supplierId: string;
  totalAmount: number;
  date: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  products?: PurchaseProductDTO[]; 
}

export interface PurchaseReportDTO {
  supplierId: string;
  supplierName: string;
  totalPurchases: number;
  totalSpent: number;
  periodStart: string;
  periodEnd: string;
}