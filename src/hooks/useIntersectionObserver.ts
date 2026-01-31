import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer Hook
 * 
 * Performance: Uses native IntersectionObserver API
 * - No dependencies on external animation libraries
 * - Efficient for scroll-based reveals
 * - Supports triggerOnce for one-time animations
 * 
 * Usage:
 * const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
 */

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn<T extends Element> {
  ref: React.RefObject<T | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        if (!observerEntry) return;

        setEntry(observerEntry);
        setIsIntersecting(observerEntry.isIntersecting);

        if (observerEntry.isIntersecting && triggerOnce) {
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, isIntersecting, entry };
}
