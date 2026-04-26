'use client';
import { useState, useEffect, useCallback } from 'react';
import { PurchasesService } from '../services/purchases.service';
import { PurchaseDTO } from '../types';

export function usePurchases() {
  const [purchases, setPurchases] = useState<PurchaseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    try {
      const data = await PurchasesService.getPurchases();
      setPurchases(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPurchases(); }, [fetchPurchases]);

  return { purchases, loading, refetch: fetchPurchases };
}