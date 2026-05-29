import { useState } from 'react';

export function useCTARedirect() {
  const [loadingState, setLoadingState] = useState<string | null>(null);

  const handleCTAClick = (e: React.MouseEvent<HTMLElement>, href: string, buttonId: string) => {
    e.preventDefault();
    if (loadingState) return; // Prevent multiple clicks
    
    setLoadingState(buttonId);

    // 3-second timeout to redirect to fallback page
    const timeoutId = setTimeout(() => {
      window.location.pathname = '/traffic-fallback';
    }, 3000);

    // Pre-flight check
    fetch('https://app.exeract.com', { mode: 'no-cors' })
      .then(() => {
        clearTimeout(timeoutId);
        window.location.href = href;
      })
      .catch((error) => {
        console.error('Pre-flight fetch failed:', error);
        clearTimeout(timeoutId);
        window.location.pathname = '/traffic-fallback';
      });
  };

  return { handleCTAClick, loadingState };
}
