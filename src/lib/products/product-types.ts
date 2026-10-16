import type { ReactNode } from "react";

export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type ProductView = "table" | "grid";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
};

export type ApiProduct = {
  _id?: string;
  id?: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
};

export type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: ApiProduct[] | {
    products?: ApiProduct[];
    items?: ApiProduct[];
    product?: ApiProduct;
  };
  products?: ApiProduct[];
};

export type SummaryCardData = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  iconStyle: string;
};