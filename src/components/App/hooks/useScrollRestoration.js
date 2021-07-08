import { useLayoutEffect } from 'react';

export const useScrollRestoration = () => {
  useLayoutEffect(() => {
    const canControlScrollRestoration = 'scrollRestoration' in window.history;

    if (canControlScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  });
};
