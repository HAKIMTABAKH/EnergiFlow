export interface SensorData {
  timestamp: string;
  voltage: number;
  temperature: number;
  humidity: number;
  light: number;
}

export interface MetricChange {
  value: number;
  percentage: string;
}

export interface ProcessedSensorData {
  powerUsage: MetricChange;
  batteryLevel: MetricChange;
  temperature: MetricChange;
  systemLoad: MetricChange;
}