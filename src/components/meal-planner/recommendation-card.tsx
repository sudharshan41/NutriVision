"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FoodVisualizer from '@/components/shared/food-visualizer';

interface RecommendationCardProps {
  content: string;
}

export default function RecommendationCard({ content }: RecommendationCardProps) {
    const [selectedFood, setSelectedFood] = useState<string | null>(null);

    // Basic parsing to find potential food items to visualize
    const foodItems = content.match(/\b(apple|salmon|chicken breast|quinoa|salad|soup|toast)\b/gi) || [];
    const uniqueFoodItems = [...new Set(foodItems.map(item => item.toLowerCase()))];
  
    return (
    <Card className="prose dark:prose-invert max-w-none p-6">
      <CardHeader>
        <CardTitle>Your Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
        
        {uniqueFoodItems.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Visualize Portions:</h4>
            <Dialog>
              <div className="flex flex-wrap gap-2">
                {uniqueFoodItems.map((food, index) => (
                  <DialogTrigger asChild key={index}>
                    <Button variant="outline" size="sm" onClick={() => setSelectedFood(food)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualize {food}
                    </Button>
                  </DialogTrigger>
                ))}
              </div>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>3D Food Visualization</DialogTitle>
                  <DialogDescription>
                    Visualizing a standard portion of {selectedFood}.
                  </DialogDescription>
                </DialogHeader>
                <div className="h-64 w-full">
                  {selectedFood && <FoodVisualizer foodItem={selectedFood} />}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
