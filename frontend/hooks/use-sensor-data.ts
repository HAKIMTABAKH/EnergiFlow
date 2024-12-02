'use client';

import { useState, useEffect } from 'react';
import { fetchSensorData } from '@/lib/services/api';
import { processSensorData, formatChartData } from '@/lib/utils/data-processing';
import type { SensorData, ProcessedSensorData } from '@/lib/types/sensor-data';
import type { ChartData } from '@/lib/types/metrics';

interface UseSensorDataReturn {
  metrics: ProcessedSensorData | null;
  chartData: {
    voltage: ChartData[];
    temperature: ChartData[];
    light: ChartData[];
    humidity: ChartData[];
  };
  error: Error | null;
  isLoading: boolean;
}

export function useSensorData(refreshInterval = 10000): UseSensorDataReturn {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setError(null);
        const data = await fetchSensorData();
        if (mounted) {
          setSensorData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'));
          setIsLoading(false);
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refreshInterval]);

  const metrics = sensorData.length > 0 
    ? processSensorData(sensorData)
    : null;

  const chartData = {
    voltage: formatChartData(sensorData, 'voltage'),
    temperature: formatChartData(sensorData, 'temperature'),
    light: formatChartData(sensorData, 'light'),
    humidity: formatChartData(sensorData, 'humidity'),
  };

  return { metrics, chartData, error, isLoading };
}