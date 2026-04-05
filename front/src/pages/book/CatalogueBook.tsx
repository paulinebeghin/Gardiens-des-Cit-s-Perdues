import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import type { Book } from '../../innterface/book.interface';
import { BookItem } from '../../components/BookItem';

export const CatalogueBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        // Appel à ton API Express/Prisma
        const response = await fetch(`${API_URL}/api/book`); 
        if (!response.ok) throw new Error("Erreur réseau");
        
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Erreur chargement livres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const sortedBooks = books
  .filter(b => b.category === "BOOK")
  .sort((a, b) => 
    (a.titleCategory || "").localeCompare(b.titleCategory || "", undefined, { numeric: true, sensitivity: 'base' })
  );

// Tri pour les Romans Graphiques
const sortedGraphBooks = books
  .filter(b => b.category === "BOOK_GRAPH")
  .sort((a, b) => {
        // "a - b" : le plus ancien en haut, le dernier ajouté va "derrière" (en bas)
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
  );
  if (loading) return (
    <div className="flex justify-center items-center h-screen text-white text-xl">
      Chargement du catalogue...
    </div>
  );

  return (
    <div>
      <Header name={'Livres'} />
      
      <div className="mx-auto border border-white rounded-[48px] p-8 mt-10">
        <div className="flex flex-wrap gap-7 justify-center">  
  
          {sortedBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}

          {sortedBooks.length > 0 && sortedGraphBooks.length > 0 && (
            <div className="h-[0.5px] bg-white/30 w-full my-4" />
          )}

          {sortedGraphBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
          
        </div>
      </div>
    </div>
  );
};