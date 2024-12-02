'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeviceSetupForm } from '@/components/device-setup/device-setup-form';
import { DeviceConfiguration } from '@/components/device-setup/device-configuration';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, List } from 'lucide-react';
import { DeviceList } from '@/components/device-setup/device-list';

export default function DeviceSetup() {
  const [activeDevice, setActiveDevice] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
            Device Setup
          </h1>
          <p className="text-light-text/80 dark:text-dark-text/80">
            Configure and manage your ESP32 devices for energy monitoring.
          </p>
        </motion.div>

        <Card className="p-6">
          <Tabs defaultValue="new-device" className="space-y-6">
            <TabsList>
              <TabsTrigger value="new-device" className="space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Device</span>
              </TabsTrigger>
              <TabsTrigger value="device-list" className="space-x-2">
                <List className="h-4 w-4" />
                <span>My Devices</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new-device" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DeviceSetupForm onDeviceCreated={setActiveDevice} />
                {activeDevice && <DeviceConfiguration deviceId={activeDevice} />}
              </div>
            </TabsContent>

            <TabsContent value="device-list">
              <DeviceList onDeviceSelect={setActiveDevice} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}