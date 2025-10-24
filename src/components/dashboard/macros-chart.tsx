"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';

interface MacrosChartProps {
  totals: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function MacrosChart({ totals }: MacrosChartProps) {
  const data = [
    { name: 'Protein', value: totals.protein, fill: 'hsl(var(--chart-2))' },
    { name: 'Carbs', value: totals.carbs, fill: 'hsl(var(--chart-4))' },
    { name: 'Fat', value: totals.fat, fill: 'hsl(var(--chart-1))' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Macronutrient Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {totals.protein > 0 || totals.carbs > 0 || totals.fat > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}g`}
              />
              <Tooltip
                cursor={{ fill: 'hsla(var(--muted))' }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">Log a meal to see your macro breakdown.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
