import type { ApiProduct, ApiResponse, Product } from "./product-types";
import { normalizeProduct, readApiError } from "./product-utils";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"
).replace(/\/+$/, "");

const PRODUCTS_URL = API_URL.endsWith("/api")
  ? `${API_URL}/products`
  : `${API_URL}/api/products`;

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  const body = (await response.json()) as ApiResponse;
  const payload = body.data;

  let products: ApiProduct[] = [];

  if (Array.isArray(payload)) {
    products = payload;
  } else if (payload && typeof payload === "object") {
    products = payload.products ?? payload.items ?? [];
  } else {
    products = body.products ?? [];
  }

  return products.map(normalizeProduct);
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(
    `${PRODUCTS_URL}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }
}