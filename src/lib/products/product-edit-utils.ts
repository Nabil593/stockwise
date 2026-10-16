import type {
  ApiProduct,
  ApiResponse,
  ProductField,
  ProductForm,
  ProductFormErrors,
} from "./product-edit-types";

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

export async function getErrorMessage(
  response: Response,
): Promise<string> {
  try {
    const body = (await response.json()) as ApiResponse;

    if (Array.isArray(body.errors) && body.errors.length > 0) {
      return body.errors.join(", ");
    }

    return body.message || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export function getProductFromResponse(
  body: ApiResponse,
): ApiProduct | null {
  const data = body.data;

  if (data && typeof data === "object") {
    if ("name" in data && "sku" in data) {
      return data as ApiProduct;
    }

    if ("product" in data && data.product) {
      return data.product;
    }
  }

  return body.product ?? null;
}

export function validateProductForm(
  form: ProductForm,
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  const price = Number(form.price);
  const quantity = Number(form.quantity);
  const minStock = Number(form.minStock);
  const name = form.name.trim();
  const sku = form.sku.trim();

  if (!name) {
    errors.name = "Product name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  } else if (name.length > 120) {
    errors.name = "Name cannot exceed 120 characters.";
  }

  if (!sku) {
    errors.sku = "SKU is required.";
  } else if (!/^[a-zA-Z0-9_-]+$/.test(sku)) {
    errors.sku =
      "Use only letters, numbers, hyphens, and underscores.";
  } else if (sku.length > 64) {
    errors.sku = "SKU cannot exceed 64 characters.";
  }

  if (
    ![
      "Electronics",
      "Accessories",
      "Office Equipment",
      "Furniture",
      "Bags",
      "Other",
    ].includes(form.category)
  ) {
    errors.category = "Please select a valid category.";
  }

  if (form.description.trim().length > 500) {
    errors.description = "Description cannot exceed 500 characters.";
  }

  if (
    form.price.trim() === "" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    errors.price = "Enter a valid price of 0 or more.";
  }

  if (
    form.quantity.trim() === "" ||
    !Number.isSafeInteger(quantity) ||
    quantity < 0
  ) {
    errors.quantity =
      "Quantity must be a whole number of 0 or more.";
  }

  if (
    form.minStock.trim() === "" ||
    !Number.isSafeInteger(minStock) ||
    minStock < 0
  ) {
    errors.minStock =
      "Minimum stock must be a whole number of 0 or more.";
  }

  return errors;
}

export function getStockStatus(
  quantity: number,
  minStock: number,
): "In stock" | "Low stock" | "Out of stock" {
  if (quantity <= 0) return "Out of stock";
  if (quantity <= minStock) return "Low stock";
  return "In stock";
}

export function getInputClass(
  field: ProductField,
  errors: ProductFormErrors,
): string {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 ${
    errors[field] ? "border-red-300" : "border-slate-200"
  }`;
}