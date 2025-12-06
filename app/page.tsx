'use client';

import { useEffect, useState } from 'react';
import { useDevice } from '@/src/hooks/useDevice';
import MobileView from '@/components/MobileView';
import DesktopView from '@/components/DesktopView';
import BrandSplash from '@/components/BrandSplash';
import PrivacyMessageAnimation from '@/components/PrivacyMessageAnimation';
import PrivacyMessage from '@/components/PrivacyMessage';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { isMobile, isTablet } = useDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Show brand splash screen first
  if (showSplash) {
    return (
      <>
        <BrandSplash onComplete={() => setShowSplash(false)} />
      </>
    );
  }

  // Show mobile view for mobile and tablet devices
  // Show desktop view for desktop devices
  return (
    <>
      {isMobile || isTablet ? <MobileView /> : <DesktopView />}
      <PrivacyMessageAnimation />
      <PrivacyMessage />
    </>
  );
}
