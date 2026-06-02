import { useState } from 'react';

export function useCTARedirect() {
  const [loadingState, setLoadingState] = useState<string | null>(null);

  const handleCTAClick = (e: React.MouseEvent<HTMLElement>, href: string, buttonId: string) => {
    if (
      e.button !== 0 || // Not left click
      e.metaKey || // Cmd/Windows key
      e.ctrlKey || // Ctrl key
      e.shiftKey || // Shift key
      e.altKey      // Alt key
    ) {
      return;
    }

    e.preventDefault();
    if (loadingState) return; // Prevent multiple clicks
    
    setLoadingState(buttonId);

    // 3-second timeout to redirect to product access page
    const timeoutId = setTimeout(() => {
      window.location.pathname = '/product-access';
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
        window.location.pathname = '/product-access';
      });
  };

  return { handleCTAClick, loadingState };
}
