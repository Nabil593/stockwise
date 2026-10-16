export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  minStock: number;
  createdAt?: string;
  updatedAt?: string;
};

export type StockMovement = {
  id: string;
  type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  note: string;
  createdAt?: string;
};

export type ApiProduct = {
  _id?: string;
  id?: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  minStock: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiMovement = {
  _id?: string;
  id?: string;
  type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  note?: string;
  createdAt?: string;
};

export type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?:
    | T
    | {
        product?: ApiProduct;
        products?: ApiProduct[];
        movements?: ApiMovement[];
        items?: ApiMovement[];
      };
  product?: ApiProduct;
  movements?: ApiMovement[];
};