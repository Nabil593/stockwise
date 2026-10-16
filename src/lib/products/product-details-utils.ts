import type {
  ApiMovement,
  ApiProduct,
  ApiResponse,
  Product,
  ProductStatus,
  StockMovement,
} from "./product-details-types";

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"
).replace(/\/+$/, "");

export const statusClasses: Record<ProductStatus, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Low Stock": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Out of Stock": "bg-red-50 text-red-700 ring-red-600/20",
};

export function getStatus(
  quantity: number,
  minStock: number,
): ProductStatus {
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= minStock) return "Low Stock";
  return "In Stock";
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(value?: string): string {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value?: string): string {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export async function readApiError(
  response: Response,
): Promise<string> {
  try {
    const body = (await response.json()) as ApiResponse<unknown>;
    return body.message ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export function normalizeProduct(product: ApiProduct): Product {
  return {
    id: product._id ?? product.id ?? "",
    name: product.name,
    sku: product.sku,
    category: product.category,
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    quantity: Number(product.quantity ?? 0),
    minStock: Number(product.minStock ?? 0),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export function normalizeMovement(
  movement: ApiMovement,
): StockMovement {
  return {
    id: movement._id ?? movement.id ?? "",
    type: movement.type,
    quantity: Number(movement.quantity ?? 0),
    note: movement.note ?? "",
    createdAt: movement.createdAt,
  };
}