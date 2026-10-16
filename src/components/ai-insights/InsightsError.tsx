import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function InsightsError({ message, onRetry }: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 shrink-0 text-rose-600" size={21} />
        <div>
          <h3 className="font-semibold text-rose-800">
            Could not load insights
          </h3>
          <p className="mt-1 break-words text-sm text-rose-700">
            {message}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
      >
        <RefreshCw size={15} /> Try again
      </button>
    </div>
  );
}