import { LucideIcon } from 'lucide-react';

export type MetricStatus = 'warning' | 'success' | 'normal';

export interface Metric {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  status: MetricStatus;
}

export interface ChartData {
  time: string;
  value: number;
}