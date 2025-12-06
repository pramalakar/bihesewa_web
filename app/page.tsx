'use client';

import { useEffect, useState } from 'react';
import { useDevice } from '@/src/hooks/useDevice';
import MobileView from '@/components/MobileView';
import DesktopView from '@/components/DesktopView';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isMobile, isTablet } = useDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Show mobile view for mobile and tablet devices
  // Show desktop view for desktop devices
  return (
    <>
      {isMobile || isTablet ? <MobileView /> : <DesktopView />}
    </>
  );
}
