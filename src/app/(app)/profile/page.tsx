import { PageHeader } from "@/components/layout/page-header";
import { ProfileForm } from "@/components/profile/profile-form";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Your Profile"
        description="Manage your health conditions, goals, and allergies to get personalized recommendations."
      />
      <Card className="mt-8 max-w-2xl mx-auto">
        <CardContent className="pt-6">
            <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
