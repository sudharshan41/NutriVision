"use client";

import { useState, useMemo } from 'react';
import type { MealLogEntry } from '@/lib/types';
import { mealLog as initialMealLog, recipes } from '@/lib/data';
import StatsCards from './stats-cards';
import MacrosChart from './macros-chart';
import MealLog from './meal-log';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { format, startOfToday } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardClient() {
  const [mealLog, setMealLog] = useState<MealLogEntry[]>(initialMealLog);
  const today = startOfToday();

  const todaysMeals = useMemo(() => {
    const todayStr = format(today, 'yyyy-MM-dd');
    return mealLog.filter((entry) => entry.date === todayStr);
  }, [mealLog, today]);

  const handleAddRandomMeal = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const newEntry: MealLogEntry = {
      date: format(today, 'yyyy-MM-dd'),
      recipe: randomRecipe,
    };
    setMealLog((prevLog) => [...prevLog, newEntry]);
  };

  const totals = useMemo(() => {
    return todaysMeals.reduce(
      (acc, entry) => {
        acc.calories += entry.recipe.calories;
        acc.protein += entry.recipe.protein;
        acc.carbs += entry.recipe.carbs;
        acc.fat += entry.recipe.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [todaysMeals]);

  return (
    <div className="mt-8 grid gap-8">
      <StatsCards totals={totals} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <MacrosChart totals={totals} />
        </div>
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Log a Meal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Add a random meal to today's log to see your progress update.</p>
              <Button onClick={handleAddRandomMeal} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Log Random Meal
              </Button>
            </CardContent>
          </Card>
           <MealLog meals={todaysMeals} />
        </div>
      </div>
    </div>
  );
}
