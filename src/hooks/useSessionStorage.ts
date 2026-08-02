import { useState, useEffect, useCallback } from 'react';

export function useSessionStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = sessionStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValueWithStorage = useCallback((newValue: T) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent(`sessionStorage:${key}`, { detail: newValue }));
    } catch {
      console.error(`Failed to save to sessionStorage for key: ${key}`);
    }
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setValue(customEvent.detail);
    };

    window.addEventListener(`sessionStorage:${key}`, handleStorageChange);
    return () => window.removeEventListener(`sessionStorage:${key}`, handleStorageChange);
  }, [key]);

  return [value, setValueWithStorage];
}
