"use client";

import type { MealLogEntry } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MealLogProps {
  meals: MealLogEntry[];
}

export default function MealLog({ meals }: MealLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {meals.length > 0 ? (
            <div className="space-y-4">
              {meals.map((entry, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{entry.recipe.name}</p>
                    <p className="text-sm text-muted-foreground">{entry.recipe.calories} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-center text-muted-foreground">No meals logged for today.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
