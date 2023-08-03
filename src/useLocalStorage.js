import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get the value from localStorage, or return the initial value if not present
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If there's an error (e.g., if localStorage is disabled), return the initial value
      return initialValue;
    }
  });

  const setValue = (value) => {console.log('tokenvalue',value)
    try {
      // Save the value to localStorage
      window.localStorage.setItem(key, value);
      setStoredValue(value);
    } catch (error) {
      // Handle errors (e.g., if localStorage is full or disabled)
      console.error('Error storing data in localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
