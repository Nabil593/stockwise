"use client";

import { useAIInsights } from "@/hooks/useAIInsights";

import InsightsHeader from "@/components/ai-insights/InsightsHeader";
import InsightsHero from "@/components/ai-insights/InsightsHero";
import InsightsError from "@/components/ai-insights/InsightsError";
import InsightsMetrics from "@/components/ai-insights/InsightsMetrics";
import InsightList from "@/components/ai-insights/InsightList";
import CategoryAnalysis from "@/components/ai-insights/CategoryAnalysis";
import InventorySnapshot from "@/components/ai-insights/InventorySnapshot";
import StockMovements from "@/components/ai-insights/StockMovements";
import InsightsFooter from "@/components/ai-insights/InsightsFooter";

export default function AIInsightsPage() {
  const {
    summary,
    movements,
    categories,
    insights,
    generatedAt,
    analysisType,
    loading,
    error,
    fetchInsights,
  } = useAIInsights();

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page header */}
        <InsightsHeader
          loading={loading}
          onRefresh={fetchInsights}
        />

        {/* Hero banner */}
        <InsightsHero />

        {/* API error */}
        {error && (
          <InsightsError
            message={error}
            onRetry={fetchInsights}
          />
        )}

        {/* Summary cards */}
        <InsightsMetrics summary={summary} />

        {/* Recommendations */}
        <InsightList
          insights={insights}
          loading={loading}
        />

        {/* Category analysis and inventory snapshot */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryAnalysis categories={categories} />

          <InventorySnapshot
            summary={summary}
            categories={categories}
          />
        </div>

        {/* Stock movement statistics */}
        <StockMovements movements={movements} />

        {/* Footer */}
        <InsightsFooter
          generatedAt={generatedAt}
          analysisType={analysisType}
        />
      </div>
    </main>
  );
}