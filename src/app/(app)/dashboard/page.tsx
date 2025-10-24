import { PageHeader } from "@/components/layout/page-header";
import DashboardClient from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Dashboard"
        description="Track your nutritional progress at a glance."
      />
      <DashboardClient />
    </div>
  );
}
