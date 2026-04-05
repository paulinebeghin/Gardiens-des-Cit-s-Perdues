import { useState, useEffect } from 'react';
import type { Book } from '../innterface/book.interface';

export const useFetchBook = (id: string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/book/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) throw new Error("Livre introuvable");
          throw new Error("Une erreur est survenue lors de la récupération");
        }

        const data: Book = await response.json();
        setBook(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { book, loading, error };
};