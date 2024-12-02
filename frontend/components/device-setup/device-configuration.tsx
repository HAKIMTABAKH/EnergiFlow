'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DeviceConfigurationProps {
  deviceId: string;
}

export function DeviceConfiguration({ deviceId }: DeviceConfigurationProps) {
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const configCode = `
{
  "device_id": "${deviceId}",
  "server": "wss://energiflow.com/ws",
  "api_version": "1.0",
  "update_interval": 5000
}`.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkConnection = async () => {
    setIsConnecting(true);
    try {
      // Simulate connection check
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: 'Connection successful',
        description: 'Your device is now connected to EnergiFlow.',
      });
    } catch (error) {
      toast({
        title: 'Connection failed',
        description: 'Please check your device configuration and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
          Device Configuration
        </h3>
        <p className="text-light-text/80 dark:text-dark-text/80 text-sm">
          Copy this configuration to your ESP32 device
        </p>
      </div>

      <div className="relative">
        <pre className="p-4 rounded-lg bg-light-background dark:bg-dark-background border border-light-text/10 dark:border-dark-text/10 overflow-x-auto">
          <code className="text-sm text-light-text dark:text-dark-text">
            {configCode}
          </code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-light-accent-lime dark:text-dark-accent-cyan" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-light-text dark:text-dark-text">
          Next Steps:
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-light-text/80 dark:text-dark-text/80">
          <li>Copy the configuration above</li>
          <li>Upload it to your ESP32 device</li>
          <li>Restart your device</li>
          <li>Check the connection status below</li>
        </ol>
      </div>

      <Button
        onClick={checkConnection}
        disabled={isConnecting}
        className="w-full"
      >
        {isConnecting && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
        Check Connection
      </Button>
    </motion.div>
  );
}