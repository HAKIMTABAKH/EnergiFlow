import type { SensorData, ProcessedSensorData } from '@/lib/types/sensor-data';
import type { ChartData } from '@/lib/types/metrics';

export function calculatePercentageChange(current: number, previous: number): string {
  if (!previous) return '0%';
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
}

export function processSensorData(
  currentData: SensorData[],
  previousData?: SensorData
): ProcessedSensorData {
  const latest = currentData[0];
  const previous = previousData || currentData[1] || latest;

  return {
    powerUsage: {
      value: latest.voltage,
      percentage: calculatePercentageChange(latest.voltage, previous.voltage),
    },
    batteryLevel: {
      value: latest.light,
      percentage: calculatePercentageChange(latest.light, previous.light),
    },
    temperature: {
      value: latest.temperature,
      percentage: calculatePercentageChange(latest.temperature, previous.temperature),
    },
    systemLoad: {
      value: latest.humidity,
      percentage: calculatePercentageChange(latest.humidity, previous.humidity),
    },
  };
}

export function formatChartData(data: SensorData[], key: keyof SensorData): ChartData[] {
  return data.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    value: item[key] as number,
  })).reverse();
}