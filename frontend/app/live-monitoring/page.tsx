'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Camera, AlertTriangle } from 'lucide-react';

export default function LiveMonitoring() {
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);  // Fixing the type of iframeRef

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (iframeRef.current) {
      // If playing, set the iframe source to the stream URL
      if (isPlaying) {
        iframeRef.current.src = "http://10.245.86.129:8080/browserfs.html"; // Start the stream
      } else {
        iframeRef.current.src = ""; // Stop the stream (pause)
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Ensure the stream starts playing when the component mounts or when play is clicked
      if (iframeRef.current) {
        iframeRef.current.src = "http://10.245.86.129:8080/browserfs.html"; // Start the stream
      }
    } else {
      // If paused, stop the stream by clearing the iframe src
      if (iframeRef.current) {
        iframeRef.current.src = ""; // Stop the stream
      }
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
            Live Monitoring
          </h1>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" onClick={() => {}}>
              <Camera className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="relative bg-black w-full" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0">
                {/* Non-clickable iframe with no hover and no scroll */}
                <iframe
                  ref={iframeRef}
                  className="w-full h-full object-cover"
                  title="Live Video Feed"
                  frameBorder="0"
                  scrolling="no"  // Disable scrolling
                  style={{
                    pointerEvents: 'none',  // Disable pointer events (no hover/click)
                    userSelect: 'none',     // Prevent text selection (if any)
                    touchAction: 'none',    // Disable touch actions like scrolling or zooming
                  }}
                />
                {/* Overlay message when the stream is paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out opacity-100">
                    <p className="text-white text-2xl font-semibold animate-fade-in">Stream is paused</p>
                  </div>
                )}
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
                  <span className="text-light-text/80 dark:text-dark-text/80">Camera Status</span>
                  <span className="text-light-accent-lime dark:text-dark-accent-cyan">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-light-text/80 dark:text-dark-text/80">Stream Quality</span>
                  <span className="text-light-text dark:text-dark-text">720p</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-light-text/80 dark:text-dark-text/80">Framerate</span>
                  <span className="text-light-text dark:text-dark-text">30 FPS</span>
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
