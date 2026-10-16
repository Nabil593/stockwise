"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  CircleAlert,
  Package,
  RefreshCw,
  Tag,
  Warehouse,
} from "lucide-react";

import SummaryCard from "@/components/products/details/SummaryCard";
import ProductHeader from "@/components/products/details/ProductHeader";
import ProductInformation from "@/components/products/details/ProductInformation";
import InventoryHealth from "@/components/products/details/InventoryHealth";
import StockMovementHistory from "@/components/products/details/StockMovementHistory";
import ProductSidebar from "@/components/products/details/ProductSidebar";

import type {
  ApiMovement,
  ApiProduct,
  ApiResponse,
  Product,
  StockMovement,
} from "@/lib/products/product-details-types";

import {
  API_URL,
  formatPrice,
  getStatus,
  normalizeMovement,
  normalizeProduct,
  readApiError,
} from "@/lib/products/product-details-utils";

export default function SingleProductPage() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [movementError, setMovementError] = useState("");

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    setMovementError("");

    try {
      const response = await fetch(
        `${API_URL}/products/${encodeURIComponent(productId)}`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
          cache: "no-store",
        },
      );

      if (response.status === 404) {
        setProduct(null);
        setLoadError(
          "Product not found or you do not have access to it.",
        );
        return;
      }

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      const body =
        (await response.json()) as ApiResponse<ApiProduct>;

      const payload = body.data;
      let rawProduct: ApiProduct | undefined;

      if (
        payload &&
        !Array.isArray(payload) &&
        "product" in payload
      ) {
        rawProduct = payload.product;
      } else if (
        payload &&
        !Array.isArray(payload) &&
        "name" in payload
      ) {
        rawProduct = payload as ApiProduct;
      } else {
        rawProduct = body.product;
      }

      if (!rawProduct) {
        throw new Error(
          "The API response did not contain a product.",
        );
      }

      setProduct(normalizeProduct(rawProduct));

      // Movement history is optional; product details can still load.
      try {
        const movementResponse = await fetch(
          `${API_URL}/stock/movements?productId=${encodeURIComponent(productId)}&limit=5`,
          {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
            cache: "no-store",
          },
        );

        if (!movementResponse.ok) {
          throw new Error(await readApiError(movementResponse));
        }

        const movementBody =
          (await movementResponse.json()) as ApiResponse<
            ApiMovement[]
          >;

        const movementPayload = movementBody.data;
        let rawMovements: ApiMovement[] = [];

        if (Array.isArray(movementPayload)) {
          rawMovements = movementPayload;
        } else if (
          movementPayload &&
          typeof movementPayload === "object"
        ) {
          rawMovements =
            movementPayload.movements ??
            movementPayload.items ??
            [];
        } else {
          rawMovements = movementBody.movements ?? [];
        }

        setMovements(rawMovements.map(normalizeMovement));
      } catch (error) {
        setMovements([]);
        setMovementError(
          error instanceof Error
            ? error.message
            : "Could not load stock movement history.",
        );
      }
    } catch (error) {
      setProduct(null);
      setLoadError(
        error instanceof Error
          ? error.message
          : "Could not load this product.",
      );
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50/70 p-6 text-center">
        <RefreshCw
          size={28}
          className="animate-spin text-emerald-600"
        />
        <h1 className="mt-4 font-bold text-slate-900">
          Loading product
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Fetching product details from StockWise...
        </p>
      </div>
    );
  }

  if (!product || loadError) {
    return (
      <div className="min-h-screen bg-slate-50/70 p-4 sm:p-8">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <Package size={26} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            {loadError.toLowerCase().includes("not found")
              ? "Product not found"
              : "Unable to load product"}
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {loadError || "This product could not be found."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void fetchProduct()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Try again
            </button>

            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = getStatus(product.quantity, product.minStock);
  const stockValue = product.quantity * product.price;

  return (
    <div className="min-h-screen space-y-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <ProductHeader product={product} status={status} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Current Stock"
          value={`${product.quantity} units`}
          description="Available inventory"
          icon={<Boxes size={20} />}
          iconClass="bg-emerald-50 text-emerald-700"
        />

        <SummaryCard
          title="Unit Price"
          value={formatPrice(product.price)}
          description="Price per unit"
          icon={<Tag size={20} />}
          iconClass="bg-blue-50 text-blue-700"
        />

        <SummaryCard
          title="Stock Value"
          value={formatPrice(stockValue)}
          description="Quantity × unit price"
          icon={<Warehouse size={20} />}
          iconClass="bg-violet-50 text-violet-700"
        />

        <SummaryCard
          title="Minimum Stock"
          value={`${product.minStock} units`}
          description="Restock alert threshold"
          icon={<CircleAlert size={20} />}
          iconClass="bg-amber-50 text-amber-700"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ProductInformation product={product} />

          <InventoryHealth
            product={product}
            status={status}
          />

          <StockMovementHistory
            movements={movements}
            movementError={movementError}
          />
        </div>

        <ProductSidebar product={product} />
      </div>
    </div>
  );
}