"use client";

import { useState } from "react";
import { useUserProfile } from "@/context/user-profile-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { allergyDetection } from "@/ai/flows/allergy-detection";
import { Loader, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DetectionResult {
  containsAllergens: boolean;
  detectedAllergens: string[];
}

export default function AllergyCheckClient() {
  const { profile } = useUserProfile();
  const [mealPlan, setMealPlan] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!mealPlan.trim()) {
      setError("Please enter a recipe or meal plan to check.");
      return;
    }
    if (profile.allergies.length === 0) {
      setError("Please add allergies to your profile first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const detectionResult = await allergyDetection({
        mealPlan,
        allergens: profile.allergies,
      });
      setResult(detectionResult);
    } catch (err) {
      console.error(err);
      setError("Failed to perform allergy detection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Check Recipe for Allergens</CardTitle>
          <CardDescription>
            Enter a recipe or list of ingredients below. We'll check it against your saved allergies: <strong className="text-primary">{profile.allergies.join(", ") || "None"}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 1 cup flour, 1 egg, 1/2 cup milk..."
            value={mealPlan}
            onChange={(e) => setMealPlan(e.target.value)}
            rows={6}
          />
          <Button onClick={handleCheck} disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            Check for Allergens
          </Button>
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        result.containsAllergens ? (
            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Allergens Detected!</AlertTitle>
                <AlertDescription>
                    This recipe may contain the following allergens from your profile: <strong className="capitalize">{result.detectedAllergens.join(', ')}</strong>. Please be cautious.
                </AlertDescription>
            </Alert>
        ) : (
            <Alert className="border-green-500 text-green-700 dark:border-green-400 dark:text-green-400">
                <ShieldX className="h-4 w-4 !text-green-500 dark:!text-green-400" />
                <AlertTitle className="text-green-700 dark:text-green-400">All Clear!</AlertTitle>
                <AlertDescription>
                    Based on our analysis, no allergens from your profile were detected.
                </AlertDescription>
            </Alert>
        )
      )}
    </div>
  );
}
