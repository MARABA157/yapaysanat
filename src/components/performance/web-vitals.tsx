import { useEffect } from 'react';
import * as webVitals from 'web-vitals';

export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals ölçümü
    webVitals.onCLS((metric) => {
      console.log('CLS:', metric.value);
    });
    
    webVitals.onFID((metric) => {
      console.log('FID:', metric.value);
    });
    
    webVitals.onLCP((metric) => {
      console.log('LCP:', metric.value);
    });
  }, []);

  return null;
}
