import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  RotateCcw,
  Save,
} from "lucide-react";

type Props = {
  productId: string;
  isSaving: boolean;
  notice: string;
  noticeType: "success" | "error";
};

export default function ProductEditActions({
  productId,
  isSaving,
  notice,
  noticeType,
}: Props) {
  const detailsUrl = `/dashboard/products/${encodeURIComponent(productId)}`;

  return (
    <>
      {notice && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            noticeType === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {noticeType === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          )}
          <p>{notice}</p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href={detailsUrl}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          <RotateCcw className="h-4 w-4" />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}