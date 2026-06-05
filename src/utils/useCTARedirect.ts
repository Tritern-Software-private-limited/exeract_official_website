import { useState, useEffect, useRef } from 'react';

export function useCTARedirect() {
  const [loadingState, setLoadingState] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRedirectRef = useRef<boolean>(false);

  useEffect(() => {
    const resetState = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      activeRedirectRef.current = false;
      setLoadingState(null);
    };

    const handlePageShow = () => {
      // Small timeout to ensure the browser has fully resumed event loop and React is ready
      setTimeout(resetState, 50);
    };

    const handlePageHide = () => {
      resetState();
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
    activeRedirectRef.current = true;

    // 3-second timeout to redirect to product access page if pre-flight fails or hangs
    timeoutRef.current = setTimeout(() => {
      if (activeRedirectRef.current) {
        window.location.pathname = '/product-access';
      }
    }, 3000);

    // Pre-flight check
    fetch('https://app.exeract.com', { mode: 'no-cors' })
      .then(() => {
        if (activeRedirectRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          window.location.href = href;

          // Safety timeout: if page doesn't unload within 8 seconds, reset loading state
          timeoutRef.current = setTimeout(() => {
            if (activeRedirectRef.current) {
              setLoadingState(null);
              activeRedirectRef.current = false;
            }
          }, 8000);
        }
      })
      .catch((error) => {
        console.error('Pre-flight fetch failed:', error);
        if (activeRedirectRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          window.location.pathname = '/product-access';
        }
      });
  };

  return { handleCTAClick, loadingState };
}
