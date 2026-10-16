export const categories = [
  "Electronics",
  "Accessories",
  "Office Equipment",
  "Furniture",
  "Bags",
  "Other",
];

export type ProductForm = {
  name: string;
  sku: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
  minStock: string;
};

export type ProductField = keyof ProductForm;

export type ProductFormErrors = Partial<
  Record<ProductField, string>
>;

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
};

export type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: ApiProduct | { product?: ApiProduct };
  product?: ApiProduct;
  errors?: string[];
};

export const emptyForm: ProductForm = {
  name: "",
  sku: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
  minStock: "",
};