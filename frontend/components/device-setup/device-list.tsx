'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Trash2, Settings } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

interface DeviceListProps {
  onDeviceSelect: (deviceId: string) => void;
}

// Mock data - replace with actual API call
const mockDevices: Device[] = [
  {
    id: '00:11:22:33:44:55',
    name: 'Living Room Monitor',
    status: 'online',
    lastSeen: '2024-03-19T10:30:00Z',
  },
  {
    id: '66:77:88:99:AA:BB',
    name: 'Kitchen Sensor',
    status: 'offline',
    lastSeen: '2024-03-18T15:45:00Z',
  },
];

export function DeviceList({ onDeviceSelect }: DeviceListProps) {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const { toast } = useToast();

  const deleteDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    toast({
      title: 'Device deleted',
      description: 'The device has been removed from your account.',
    });
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">{device.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {device.status === 'online' ? (
                    <>
                      <Wifi className="h-4 w-4 text-light-accent-lime dark:text-dark-accent-cyan" />
                      <span className="text-light-accent-lime dark:text-dark-accent-cyan">
                        Online
                      </span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-light-accent-orange dark:text-dark-accent-yellow" />
                      <span className="text-light-accent-orange dark:text-dark-accent-yellow">
                        Offline
                      </span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {new Date(device.lastSeen).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeviceSelect(device.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteDevice(device.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {devices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-light-text/60 dark:text-dark-text/60"
        >
          No devices registered yet.
        </motion.div>
      )}
    </div>
  );
}