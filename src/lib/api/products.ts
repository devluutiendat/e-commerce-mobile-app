import type { Product, ProductQuery, ProductsResponse } from "@/types";
import { api } from "./client";

export const productsApi = {
  findAll: (params?: ProductQuery) =>
    api.get<ProductsResponse>("/products", { params }).then((r) => r.data),

  getTopSelling: () =>
    api.get<Product[]>("/products/top-selling").then((r) => r.data),

  findOne: (id: number) =>
    api.get<Product>(`/products/${id}`).then((r) => r.data),
};
