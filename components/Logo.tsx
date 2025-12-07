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
        case 'sm': return { width: 28, height: 35 };
        case 'lg': return { width: 56, height: 70 };
        default: return { width: 36, height: 45 };
      }
    } else {
      switch (size) {
        case 'sm': return { width: 36, height: 45 };
        case 'lg': return { width: 80, height: 100 };
        default: return { width: 40, height: 50 };
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
      <div className="relative flex-shrink-0 bg-transparent">
        <Image
          src={logoPath}
          alt="BiheSewa Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
          unoptimized={false}
        />
      </div>
      {showText && <BrandName size={size} />}
    </Link>
  );
}

