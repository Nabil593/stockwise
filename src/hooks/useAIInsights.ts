"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  Category,
  Insight,
  InsightsApiResponse,
  MovementSummary,
  Summary,
} from "@/types/ai-insights";
import {
  API_URL,
  EMPTY_MOVEMENTS,
  EMPTY_SUMMARY,
  mapInsight,
} from "@/lib/ai-insights";

export function useAIInsights() {
  const [summary, setSummary] = useState<Summary>(EMPTY_SUMMARY);
  const [movements, setMovements] =
    useState<MovementSummary>(EMPTY_MOVEMENTS);
  const [categories, setCategories] = useState<Category[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [generatedAt, setGeneratedAt] = useState("");
  const [analysisType, setAnalysisType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/ai/insights`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      const result = (await response.json()) as InsightsApiResponse;

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message || "Failed to load AI insights.",
        );
      }

      const data = result.data;

      setSummary({ ...EMPTY_SUMMARY, ...data.summary });
      setMovements({ ...EMPTY_MOVEMENTS, ...data.movements });
      setCategories(data.categories ?? []);
      setInsights((data.insights ?? []).map(mapInsight));
      setGeneratedAt(data.generatedAt ?? "");
      setAnalysisType(data.analysisType ?? "Inventory analysis");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading insights.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchInsights();
  }, [fetchInsights]);

  return {
    summary,
    movements,
    categories,
    insights,
    generatedAt,
    analysisType,
    loading,
    error,
    fetchInsights,
  };
}