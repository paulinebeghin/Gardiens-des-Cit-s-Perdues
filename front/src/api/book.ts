import { useState, useEffect } from 'react';
import type { Book } from '../innterface/book.interface';

// Tu peux importer le type Book généré par Prisma si tu es dans le même projet



export const useFetchBook = (id: string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Correction de l'URL : on utilise /api/book (ton endpoint testé sur Insomnia)
        const response = await fetch(`http://localhost:3000/api/book/${id}`);
        
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