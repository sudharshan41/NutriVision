"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface MacrosChartProps {
  totals: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

const chartConfig = {
  value: {
    label: "Grams",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-2))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-4))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function MacrosChart({ totals }: MacrosChartProps) {
  const data = [
    { name: 'Protein', value: totals.protein, fill: 'var(--color-protein)' },
    { name: 'Carbs', value: totals.carbs, fill: 'var(--color-carbs)' },
    { name: 'Fat', value: totals.fat, fill: 'var(--color-fat)' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Macronutrient Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {totals.protein > 0 || totals.carbs > 0 || totals.fat > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
                <ChartTooltip
                    cursor={{ fill: 'hsla(var(--muted))' }}
                    content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">Log a meal to see your macro breakdown.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
