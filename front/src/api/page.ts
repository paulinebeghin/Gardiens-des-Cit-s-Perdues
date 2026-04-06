import { useState, useEffect } from 'react';

export const useFetchCharacter = (slug: string | undefined) => {
  const [character, setCharacter] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/characters/${slug}`);
        if (!response.ok) throw new Error("Personnage introuvable");
        const data = await response.json();
        setCharacter(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { character, loading, error };
};