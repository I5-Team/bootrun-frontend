import { useState, useEffect } from 'react';

export const useApiData = <T,>(mockData: T, delay: number = 500) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        try {
          setData(mockData);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      }, delay);
    };

    fetchData();
  }, [delay]);

  return { data, loading, error };
};