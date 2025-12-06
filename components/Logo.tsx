'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDevice } from '@/src/hooks/useDevice';
import BrandName from './BrandName';

interface LogoProps {
  variant?: 'default' | 'landing';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ 
  variant = 'default', 
  size = 'md',
  showText = false,
  className = '' 
}: LogoProps) {
  const { isMobile } = useDevice();

  // Determine sizes based on device and prop
  const getSize = () => {
    if (isMobile) {
      switch (size) {
        case 'sm': return { width: 24, height: 30 };
        case 'lg': return { width: 40, height: 50 };
        default: return { width: 32, height: 40 };
      }
    } else {
      switch (size) {
        case 'sm': return { width: 32, height: 40 };
        case 'lg': return { width: 60, height: 75 };
        default: return { width: 48, height: 60 };
      }
    }
  };

  // Use logo.png for all variants
  const logoPath = '/logo.png';
  const dimensions = getSize();

  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2 ${className}`}
      aria-label="BiheSewa Home"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={logoPath}
          alt="BiheSewa Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      {showText && <BrandName size={size} />}
    </Link>
  );
}

