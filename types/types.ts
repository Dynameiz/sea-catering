export type Subscription = {
  id: number;
  mealPlan: string;
  allergies?: string | "-";
  createdAt: string;
  price: number;
  mealType: string[];
  deliveryDays: string[];
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
};

