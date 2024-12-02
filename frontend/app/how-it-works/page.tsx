'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Cpu, 
  WifiIcon, 
  BarChart, 
  Bell,
  Shield,
  Zap
} from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h1 className="text-4xl font-bold gradient-text">
            How EnergiFlow Works
          </h1>
          <p className="text-xl text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto">
            Discover how EnergiFlow helps you monitor and optimize your energy consumption
            with our advanced IoT platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-light-accent-violet/10 dark:bg-dark-accent-cyan/10 flex items-center justify-center">
              <Cpu className="h-6 w-6 text-light-accent-violet dark:text-dark-accent-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
              ESP32 Integration
            </h3>
            <p className="text-light-text/80 dark:text-dark-text/80">
              Connect your ESP32 device to monitor voltage, current, temperature,
              and other energy metrics in real-time.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-light-accent-orange/10 dark:bg-dark-accent-yellow/10 flex items-center justify-center">
              <WifiIcon className="h-6 w-6 text-light-accent-orange dark:text-dark-accent-yellow" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Wireless Connectivity
            </h3>
            <p className="text-light-text/80 dark:text-dark-text/80">
              Seamless wireless communication between your devices and our platform
              ensures continuous monitoring.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-light-accent-lime/10 dark:bg-dark-accent-cyan/10 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-light-accent-lime dark:text-dark-accent-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Real-time Analytics
            </h3>
            <p className="text-light-text/80 dark:text-dark-text/80">
              View detailed analytics and trends to optimize your energy consumption
              patterns.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-light-accent-violet/10 dark:bg-dark-accent-pink/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-light-accent-violet dark:text-dark-accent-pink" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Smart Alerts
            </h3>
            <p className="text-light-text/80 dark:text-dark-text/80">
              Receive instant notifications about unusual energy consumption or
              system anomalies.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-light-accent-orange/10 dark:bg-dark-accent-yellow/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-light-accent-orange dark:text-dark-accent-yellow" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Secure Platform
            </h3>
            <p className="text-light-text/80 dark:text-dark-text/80">
              Enterprise-grade security ensures your data is protected with
              end-to-end encryption.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-light-accent-lime/10 dark:bg-dark-accent-cyan/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-light-accent-lime dark:text-dark-accent-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Energy Optimization
            </h3>
            <p className="text-light-text/80 dark:text-dark-text/80">
              Get AI-powered recommendations to reduce energy consumption and
              costs.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}