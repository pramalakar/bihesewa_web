'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFloatButton({
  phoneNumber = '61467877926',
  message = 'Hello! I need help with BiheSewa.',
}: WhatsAppFloatButtonProps) {
  // Format phone number for WhatsApp (remove + and spaces)
  const formattedPhone = phoneNumber.replace(/[\s+]/g, '');
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      <span className="sr-only">Chat with us on WhatsApp</span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
    </a>
  );
}


