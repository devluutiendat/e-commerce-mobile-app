import { productsApi } from "@/lib/api/products";
import { queryKeys } from "@/lib/query-keys";
import type { ProductQuery } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params?: ProductQuery) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productsApi.findAll(params),
    placeholderData: (prev) => prev,
  });
}

export function useTopSellingProducts() {
  return useQuery({
    queryKey: queryKeys.products.topSelling(),
    queryFn: productsApi.getTopSelling,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.findOne(id),
    enabled: Number.isFinite(id),
  });
}
