import type {
  ApiProduct,
  ApiResponse,
  Product,
  ProductStatus,
} from "./product-types";

export function normalizeProduct(product: ApiProduct): Product {
  return {
    id: product._id ?? product.id ?? "",
    name: product.name,
    sku: product.sku,
    category: product.category,
    quantity: Number(product.quantity ?? 0),
    minStock: Number(product.minStock ?? 0),
    price: Number(product.price ?? 0),
  };
}

export function getProductStatus(
  product: Product,
): ProductStatus {
  if (product.quantity <= 0) return "Out of Stock";

  if (product.quantity <= product.minStock) {
    return "Low Stock";
  }

  return "In Stock";
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const statusStyles: Record<ProductStatus, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Low Stock": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Out of Stock": "bg-red-50 text-red-700 ring-red-600/20",
};

export async function readApiError(
  response: Response,
): Promise<string> {
  try {
    const body = (await response.json()) as ApiResponse;

    if (response.status === 401 || response.status === 403) {
      return body.message ?? "Please sign in to continue.";
    }

    return body.message ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}