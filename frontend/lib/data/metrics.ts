import { Battery, Cpu, Thermometer, Zap } from 'lucide-react';
import type { Metric, ChartData } from '@/lib/types/metrics';

export const metrics: Metric[] = [
  { 
    icon: Zap,
    title: 'Power Usage',
    value: '2.4 kW',
    change: '+2.5%',
    status: 'warning'
  },
  {
    icon: Battery,
    title: 'Battery Level',
    value: '85%',
    change: '-0.5%',
    status: 'success'
  },
  {
    icon: Thermometer,
    title: 'Temperature',
    value: '24°C',
    change: '+1°C',
    status: 'normal'
  },
  {
    icon: Cpu,
    title: 'System Load',
    value: '67%',
    change: '+5%',
    status: 'normal'
  }
];

export const energyData: ChartData[] = [
  { time: '00:00', value: 30 },
  { time: '04:00', value: 25 },
  { time: '08:00', value: 40 },
  { time: '12:00', value: 65 },
  { time: '16:00', value: 55 },
  { time: '20:00', value: 35 },
  { time: '24:00', value: 28 },
];

export const temperatureData: ChartData[] = [
  { time: '00:00', value: 22 },
  { time: '04:00', value: 21 },
  { time: '08:00', value: 23 },
  { time: '12:00', value: 26 },
  { time: '16:00', value: 25 },
  { time: '20:00', value: 24 },
  { time: '24:00', value: 22 },
];

export const batteryData: ChartData[] = [
  { time: '00:00', value: 85 },
  { time: '04:00', value: 82 },
  { time: '08:00', value: 78 },
  { time: '12:00', value: 75 },
  { time: '16:00', value: 72 },
  { time: '20:00', value: 70 },
  { time: '24:00', value: 68 },
];

export const systemLoadData: ChartData[] = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 42 },
  { time: '08:00', value: 60 },
  { time: '12:00', value: 75 },
  { time: '16:00', value: 65 },
  { time: '20:00', value: 55 },
  { time: '24:00', value: 48 },
];