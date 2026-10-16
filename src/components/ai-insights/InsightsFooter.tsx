import { Clock, Sparkles } from "lucide-react";

interface Props {
  generatedAt: string;
  analysisType: string;
}

export default function InsightsFooter({
  generatedAt,
  analysisType,
}: Props) {
  const formattedDate = generatedAt
    ? new Date(generatedAt).toLocaleString()
    : "Not available";

  return (
    <footer className="flex flex-col justify-between gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Clock size={15} />
        <span>Last updated: {formattedDate}</span>
      </div>

      <div className="flex items-center gap-2">
        <Sparkles size={15} />
        <span>Analysis method: {analysisType || "Inventory analysis"}</span>
      </div>
    </footer>
  );
}