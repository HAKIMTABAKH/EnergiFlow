'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const deviceSchema = z.object({
  deviceName: z.string().min(3, 'Device name must be at least 3 characters'),
  deviceId: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, 'Invalid MAC address format'),
  wifiSSID: z.string().min(1, 'SSID is required'),
  wifiPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

type DeviceFormData = z.infer<typeof deviceSchema>;

interface DeviceSetupFormProps {
  onDeviceCreated: (deviceId: string) => void;
}

export function DeviceSetupForm({ onDeviceCreated }: DeviceSetupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      deviceName: '',
      deviceId: '',
      wifiSSID: '',
      wifiPassword: '',
    },
  });

  async function onSubmit(data: DeviceFormData) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Device registered successfully',
        description: `${data.deviceName} has been added to your devices.`,
      });
      
      onDeviceCreated(data.deviceId);
    } catch (error) {
      toast({
        title: 'Error registering device',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="deviceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input placeholder="Living Room Monitor" {...field} />
              </FormControl>
              <FormDescription>
                Choose a memorable name for your device
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device ID (MAC Address)</FormLabel>
              <FormControl>
                <Input placeholder="XX:XX:XX:XX:XX:XX" {...field} />
              </FormControl>
              <FormDescription>
                Enter the MAC address of your ESP32 device
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wifiSSID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wi-Fi SSID</FormLabel>
              <FormControl>
                <Input placeholder="Your Wi-Fi network name" {...field} />
              </FormControl>
              <FormDescription>
                The Wi-Fi network your device will connect to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wifiPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wi-Fi Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Network password" {...field} />
              </FormControl>
              <FormDescription>
                Your Wi-Fi network password (stored securely)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register Device
        </Button>
      </form>
    </Form>
  );
}