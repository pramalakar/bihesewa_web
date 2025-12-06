'use client';

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1024,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const isMobile = width < 768; // Mobile: < 768px
      const isTablet = width >= 768 && width < 1024; // Tablet: 768px - 1023px
      const isDesktop = width >= 1024; // Desktop: >= 1024px

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        width,
      });
    };

    // Set initial value
    updateDeviceInfo();

    // Add event listener
    window.addEventListener('resize', updateDeviceInfo);

    // Cleanup
    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, []);

  return deviceInfo;
}

