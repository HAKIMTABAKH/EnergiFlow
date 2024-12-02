'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Camera, 
  Video,
  AlertTriangle 
} from 'lucide-react';

export default function LiveMonitoring() {
  const [isStreaming, setIsStreaming] = useState(true);

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
            Live Monitoring
          </h1>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsStreaming(!isStreaming)}
            >
              {isStreaming ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="h-16 w-16 text-gray-600" />
                <p className="absolute mt-20 text-gray-400">
                  Camera feed simulation
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
                System Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-light-text/80 dark:text-dark-text/80">
                    Camera Status
                  </span>
                  <span className="text-light-accent-lime dark:text-dark-accent-cyan">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-light-text/80 dark:text-dark-text/80">
                    Stream Quality
                  </span>
                  <span className="text-light-text dark:text-dark-text">
                    720p
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-light-text/80 dark:text-dark-text/80">
                    Framerate
                  </span>
                  <span className="text-light-text dark:text-dark-text">
                    30 FPS
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-light-accent-orange dark:border-dark-accent-yellow">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-5 w-5 text-light-accent-orange dark:text-dark-accent-yellow" />
                <div>
                  <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Recent Alert
                  </h3>
                  <p className="text-light-text/80 dark:text-dark-text/80 mt-2">
                    Unusual activity detected in Zone 2 at 14:35
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}