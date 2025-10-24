"use client";

import { useState } from "react";
import { useUserProfile } from "@/context/user-profile-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { personalizedMealRecommendations } from "@/ai/flows/personalized-meal-recommendations";
import { Loader, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import RecommendationCard from "./recommendation-card";

export default function MealPlannerClient() {
  const { profile } = useUserProfile();
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await personalizedMealRecommendations({
        healthConditions: profile.healthConditions,
        goals: profile.goals,
        allergies: profile.allergies.join(", "),
      });
      setRecommendations(result.mealRecommendations);
    } catch (err) {
      console.error(err);
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Meal Plan Generator</CardTitle>
          <CardDescription>
            Click the button below to generate a new meal plan based on your current profile settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <div className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div><strong>Health Conditions:</strong><p>{profile.healthConditions || 'Not set'}</p></div>
                <div><strong>Goals:</strong><p>{profile.goals || 'Not set'}</p></div>
                <div><strong>Allergies:</strong><p>{profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None'}</p></div>
            </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Recommendations
          </Button>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="flex justify-center items-center rounded-lg border p-8">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating your personalized plan...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && <RecommendationCard content={recommendations} />}
    </div>
  );
}
