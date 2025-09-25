'use client';

import { useEffect, useRef, useState } from 'react';

// Turnstile types
declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  tabindex?: number;
  'response-field'?: boolean;
  'response-field-name'?: string;
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  onTimeout?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  className?: string;
}

export default function Turnstile({
  siteKey,
  onVerify,
  onError,
  onExpire,
  onTimeout,
  theme = 'auto',
  size = 'normal',
  className = ''
}: TurnstileProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Turnstile script
  useEffect(() => {
    if (window.turnstile) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Turnstile script');
      onError?.();
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onError]);

  // Render Turnstile widget
  useEffect(() => {
    if (!isLoaded || !elementRef.current || widgetId) return;

    try {
      const id = window.turnstile.render(elementRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        'timeout-callback': onTimeout,
        theme,
        size
      });
      
      setWidgetId(id);
    } catch (error) {
      console.error('Failed to render Turnstile widget:', error);
      onError?.();
    }
  }, [isLoaded, siteKey, onVerify, onError, onExpire, onTimeout, theme, size]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (error) {
          console.warn('Failed to remove Turnstile widget:', error);
        }
      }
    };
  }, [widgetId]);

  // Reset widget method
  const reset = () => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  };

  // Get response method
  const getResponse = () => {
    if (widgetId && window.turnstile) {
      return window.turnstile.getResponse(widgetId);
    }
    return '';
  };

  return (
    <div className={className}>
      <div ref={elementRef} />
      {!isLoaded && (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500" />
          <span className="ml-2 text-gray-600">Loading security check...</span>
        </div>
      )}
    </div>
  );
}