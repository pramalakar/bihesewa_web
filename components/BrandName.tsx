'use client';

interface BrandNameProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BrandName({ size = 'md', className = '' }: BrandNameProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <span className={`font-sans ${sizeClasses[size]} ${className}`}>
      <span className="font-semibold text-gray-900 dark:text-white">Bihe</span>
      <span className="font-bold text-gray-900 dark:text-white">Sewa</span>
    </span>
  );
}

