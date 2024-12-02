export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastSeen: string;
  wifiSSID?: string;
  platformToken?: string;
}

export interface DeviceFormData {
  deviceName: string;
  deviceId: string;
  wifiSSID: string;
  wifiPassword: string;
}