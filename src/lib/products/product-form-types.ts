
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

export const initialForm: ProductForm = {
  name: "",
  sku: "",
  category: "",
  description: "",
  price: "",
  quantity: "0",
  minStock: "5",
};

export const productCategories = [
  "Electronics",
  "Accessories",
  "Office Equipment",
  "Furniture",
  "Bags",
  "Other",
];

export function getInputClass(
  field: ProductField,
  errors: ProductFormErrors,
) {
  return `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 ${
    errors[field] ? "border-red-400" : "border-slate-200"
  }`;
}

export function formatBDT(value: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(value);
}
