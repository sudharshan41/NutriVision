import { PageHeader } from "@/components/layout/page-header";
import MealPlannerClient from "@/components/meal-planner/meal-planner-client";

export default function MealPlannerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="AI Meal Planner"
        description="Get personalized meal recommendations based on your profile."
      />
      <MealPlannerClient />
    </div>
  );
}
