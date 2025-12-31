import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export const useSanityContent = <T>(query: string, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(query);
        if (result && (Array.isArray(result) ? result.length > 0 : Object.keys(result).length > 0)) {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
        console.error('Error fetching Sanity content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading, error };
};
