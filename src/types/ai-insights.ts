export type Severity = "critical" | "warning" | "positive" | "info";

export interface Product {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  minStock: number;
  category?: string;
}

export interface BackendInsight {
  title: string;
  description: string;
  severity: Severity;
  product?: Product | null;
  recommendation?: string;
}

export interface Insight extends BackendInsight {
  id: string;
}

export interface Summary {
  totalProducts: number;
  totalUnits: number;
  totalInventoryValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  overstockCount: number;
}

export interface MovementSummary {
  stockIn: number;
  stockOut: number;
  adjustments: number;
  totalMovements: number;
}

export interface Category {
  name: string;
  productCount: number;
  totalUnits: number;
  inventoryValue: number;
}

export interface InsightsData {
  summary: Summary;
  movements: MovementSummary;
  categories: Category[];
  insights: BackendInsight[];
  recentMovements: unknown[];
  generatedAt: string;
  analysisType: string;
}

export interface InsightsApiResponse {
  success: boolean;
  message?: string;
  data?: InsightsData;
}