'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Card } from '@/components/ui/card';
import type { ChartData } from '@/lib/types/metrics';

interface BaseChartProps {
  title: string;
  data: ChartData[];
  type: 'line' | 'bar' | 'area';
  color: string;
  fillOpacity?: number;
}

export function BaseChart({ title, data, type, color, fillOpacity = 0.3 }: BaseChartProps) {
  const ChartComponent = type === 'bar' ? BarChart : type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'bar' ? Bar : type === 'area' ? Area : Line;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
        {title}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="time"
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <DataComponent
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={fillOpacity}
              strokeWidth={2}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}