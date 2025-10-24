"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';

interface StatsCardsProps {
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const statItems = [
  { key: 'calories', label: 'Calories', unit: 'kcal', icon: Flame, color: 'text-red-500' },
  { key: 'protein', label: 'Protein', unit: 'g', icon: Beef, color: 'text-blue-500' },
  { key: 'carbs', label: 'Carbs', unit: 'g', icon: Wheat, color: 'text-yellow-500' },
  { key: 'fat', label: 'Fat', unit: 'g', icon: Droplet, color: 'text-green-500' },
];

export default function StatsCards({ totals }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <Icon className={`h-4 w-4 text-muted-foreground ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totals[item.key as keyof typeof totals].toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{item.unit}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
