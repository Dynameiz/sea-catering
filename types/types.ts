export type Subscription = {
  id: number;
  mealPlan: string;
  allergies?: string | "-";
  createdAt: string;
  price: number;
  mealType: string[];
  deliveryDays: string[];
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
  cancelledAt?: string | null;
  reactivatedAt?: string | null;
};

export type AdminDashboardData = {
  newSubscriptions: number;
  mrr: number;
  reactivations?: number;
  subscriptionGrowth: number;
};