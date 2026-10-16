"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, LoaderCircle } from "lucide-react";

import EditProductHeader from "@/components/products/edit/EditProductHeader";
import ProductBasicFields from "@/components/products/edit/ProductBasicFields";
import ProductInventoryFields from "@/components/products/edit/ProductInventoryFields";
import ProductLivePreview from "@/components/products/edit/ProductLivePreview";
import ProductSaveSidebar from "@/components/products/edit/ProductSaveSidebar";
import ProductEditActions from "@/components/products/edit/ProductEditActions";

import {
  emptyForm,
} from "@/lib/products/product-edit-types";

import type {
  ApiResponse,
  ProductField,
  ProductForm,
  ProductFormErrors,
} from "@/lib/products/product-edit-types";

import {
  API_URL,
  getErrorMessage,
  getProductFromResponse,
  validateProductForm,
} from "@/lib/products/product-edit-utils";

export default function EditProductPage() {
  const params = useParams<{ productId: string }>();
  const router = useRouter();
  const productId = params.productId;

  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"success" | "error">(
    "error",
  );

  const loadProduct = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setLoadError("");
      setNotice("");

      try {
        const response = await fetch(
          `${API_URL}/products/${encodeURIComponent(productId)}`,
          {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
            cache: "no-store",
            signal,
          },
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Your session has expired. Please sign in again.",
            );
          }

          throw new Error(await getErrorMessage(response));
        }

        const body = (await response.json()) as ApiResponse;
        const product = getProductFromResponse(body);

        if (!product) {
          throw new Error(
            "The server returned an invalid product response.",
          );
        }

        setForm({
          name: product.name ?? "",
          sku: product.sku ?? "",
          category: product.category ?? "",
          description: product.description ?? "",
          price: String(product.price ?? 0),
          quantity: String(product.quantity ?? 0),
          minStock: String(product.minStock ?? 0),
        });

        setErrors({});
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "Could not load this product.",
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [productId],
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadProduct(controller.signal);

    return () => controller.abort();
  }, [loadProduct]);

  const updateField = (field: ProductField, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setNotice("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSaving) return;

    setNotice("");

    const validationErrors = validateProductForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setNoticeType("error");
      setNotice("Please fix the validation errors before saving.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/products/${encodeURIComponent(productId)}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            sku: form.sku.trim().toUpperCase(),
            category: form.category,
            description: form.description.trim(),
            price: Number(form.price),
            quantity: Number(form.quantity),
            minStock: Number(form.minStock),
          }),
        },
      );

      if (!response.ok) {
        const message = await getErrorMessage(response);

        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please sign in again.",
          );
        }

        if (response.status === 409) {
          setErrors((previous) => ({
            ...previous,
            sku: "This SKU already exists in your inventory.",
          }));

          throw new Error("Please use a unique SKU.");
        }

        throw new Error(message);
      }

      setNoticeType("success");
      setNotice("Product updated successfully.");

      router.push(
        `/dashboard/products/${encodeURIComponent(productId)}`,
      );
      router.refresh();
    } catch (error) {
      setNoticeType("error");

      setNotice(
        error instanceof TypeError
          ? "Cannot connect to the backend. Check that the Express server is running."
          : error instanceof Error
            ? error.message
            : "Could not update the product. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-7 w-7 animate-spin text-emerald-600" />
        <span className="ml-3 text-sm text-slate-500">
          Loading product...
        </span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          Unable to load product
        </h1>

        <p
          role="alert"
          className="mt-2 max-w-lg text-sm text-slate-600"
        >
          {loadError}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => void loadProduct()}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Try again
          </button>

          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <EditProductHeader productId={productId} />

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <ProductBasicFields
              form={form}
              errors={errors}
              onChange={updateField}
            />

            <ProductInventoryFields
              form={form}
              errors={errors}
              onChange={updateField}
            />

            <ProductEditActions
              productId={productId}
              isSaving={isSaving}
              notice={notice}
              noticeType={noticeType}
            />
          </div>

          <aside className="space-y-6 xl:sticky xl:top-6">
            <ProductLivePreview form={form} />
            <ProductSaveSidebar />
          </aside>
        </div>
      </form>
    </div>
  );
}