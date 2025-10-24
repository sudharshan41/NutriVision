import { PageHeader } from "@/components/layout/page-header";
import AllergyCheckClient from "@/components/allergy-check/allergy-check-client";

export default function AllergyCheckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Allergy Detection"
        description="Check a meal plan or recipe for potential allergens based on your profile."
      />
      <AllergyCheckClient />
    </div>
  );
}
