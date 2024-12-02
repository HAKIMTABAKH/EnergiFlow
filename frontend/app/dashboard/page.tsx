'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Zap, Cpu, LightbulbIcon, Thermometer, Battery, Droplet } from 'lucide-react';
import { EnergyConsumptionGraph } from '@/components/graphs/energy-consumption-graph';
import { TemperatureGraph } from '@/components/graphs/temperature-graph';
import { BatteryLevelGraph } from '@/components/graphs/battery-level-graph';
import { SystemLoadGraph } from '@/components/graphs/system-load-graph';

// Define the SensorData interface for type safety
interface SensorData {
  current: number;
  timestamp: string;
  voltage: number;
  light: number;
  temperature: number;
  humidity: number;
}

export default function Dashboard() {
  const [data, setData] = useState<{ time: string; value: number }[]>([]);
  const [metrics, setMetrics] = useState([
    { 
      icon: Zap,
      title: 'Power Voltage',
      value: 'Loading...',
      change: '...',
      status: 'normal'
    },
    { 
      icon: Cpu,
      title: 'Current',
      value: 'Loading...',
      change: '...',
      status: 'normal'
    },
    {
      icon: LightbulbIcon,
      title: 'Light',
      value: 'Loading...',
      change: '...',
      status: 'normal'
    },
    {
      icon: Thermometer,
      title: 'Temperature',
      value: 'Loading...',
      change: '...',
      status: 'normal'
    },
    {
      icon: Droplet,
      title: 'Humidity',
      value: 'Loading...',
      change: '...',
      status: 'normal'
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://192.168.35.222:5000/api/sensor-data');
        if (!response.ok) throw new Error('Failed to fetch sensor data');
        const sensorData: SensorData[] = await response.json();

        if (sensorData.length > 0) {
          // Update line chart data
          setData(sensorData.map((item) => ({
            time: new Date(item.timestamp).toLocaleTimeString(),
            value: item.voltage, // Adjust to the appropriate key for the graph
          })));

          // Update metrics based on the latest sensor data
          const latestData = sensorData[0];
          setMetrics([
            { 
              icon: Zap,
              title: 'Power Voltage',
              value: `${latestData.voltage.toFixed(2)} V`,
              change: '+2.5%', // Replace with a calculated value if applicable
              status: 'warning'
            },
            { 
              icon: Cpu,
              title: 'Current',
              value: `${latestData.current.toFixed(2)} A`,
              change: '+2.5%', // Replace with a calculated value if applicable
              status: 'warning'
            },
            {
              icon: LightbulbIcon,
              title: 'Light',
              value: `${latestData.light.toFixed(2)}%`, // Example: use light as battery level
              change: '-0.5%',
              status: 'success'
            },
            {
              icon: Thermometer,
              title: 'Temperature',
              value: `${latestData.temperature.toFixed(1)}°C`,
              change: '+1°C',
              status: 'normal'
            },
            {
              icon: Droplet ,
              title: 'Humidity',
              value: `${latestData.humidity.toFixed(1)}%`, // Example: use humidity as load
              change: '+5%',
              status: 'normal'
            }
          ]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle loading or error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
          Dashboard
        </h1>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {metrics.map((metric) => {
    const Icon = metric.icon;
    return (
      <Card key={metric.title} className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-light-text/60 dark:text-dark-text/60">
              {metric.title}
            </p>
            <h3 className="text-2xl font-bold mt-2 text-light-text dark:text-dark-text">
              {metric.value}
            </h3>
            <p className={`text-sm mt-2 ${
              metric.status === 'warning' ? 'text-light-accent-orange dark:text-dark-accent-yellow' :
              metric.status === 'success' ? 'text-light-accent-lime dark:text-dark-accent-cyan' :
              'text-light-text/60 dark:text-dark-text/60'
            }`}>
              {metric.change} from last hour
            </p>
          </div>
          <Icon className="h-8 w-8 text-light-accent-violet dark:text-dark-accent-cyan" />
        </div>
      </Card>
    );
  })}
</div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EnergyConsumptionGraph data={data} />
          <TemperatureGraph data={data} />
          <BatteryLevelGraph data={data} />
          <SystemLoadGraph data={data} />
        </div>
      </div>
    </div>
  );
}
