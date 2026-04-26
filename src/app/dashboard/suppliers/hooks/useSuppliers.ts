'use client';
import { useState, useEffect, useCallback } from 'react';
import { SuppliersService } from '../services/suppliers.service';
import { SupplierDTO } from '../types';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SuppliersService.getSuppliers();
      setSuppliers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

  return { suppliers, loading, refetch: fetchSuppliers };
}