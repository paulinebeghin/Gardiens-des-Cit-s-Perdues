import { Link } from 'react-router-dom';
import { BOOKS_DATA, BOOKS_GRAPH_DATA  } from '../../data/Book';
import { Header } from '../../components/Header';
const BOOK_PRIORITY: Record<string, number> = {
  "tome-1": 1,
  "tome-2": 2,
  "tome-3": 3,
  "tome-4": 4,
  "tome-5": 5,
  "tome-6": 6,
  "tome-7": 7,
  "tome-8": 8,
  "tome-8.5": 9,
  "tome-9": 10,
  "tome-9.5": 11,
  "tome-10": 12,
};
const BOOK_GRAPH_PRIORITY : Record<string, number>={
     "tome-vol-1-partie-1": 13,
     "tome-vol-1-partie-2": 14
}

export const CatalogueBook = () => {
   const sortedBooks = [...BOOKS_DATA].sort((a, b) => {
    // On cherche la priorité, sinon on met 99 (fin de liste)
    const priorityA = BOOK_PRIORITY[a.id] || 99;
    const priorityB = BOOK_PRIORITY[b.id] || 99;
    
    return priorityA - priorityB;
  });
   const sorteGraphdBooks = [...BOOKS_GRAPH_DATA].sort((a, b) => {
    // On cherche la priorité, sinon on met 99 (fin de liste)
    const priorityA = BOOK_GRAPH_PRIORITY[a.id] || 99;
    const priorityB = BOOK_GRAPH_PRIORITY[b.id] || 99;
    
    return priorityA - priorityB;
  });
   return (
  <div className="">
    <Header name={'Livres'}></Header>
    
    <div className=" mx-auto border border-white rounded-[48px] p-8 ">
      <div className=" flex flex-wrap md:flex-wrap gap-7  justify-center">
        
        {sortedBooks.map((book) => (
          <Link 
            key={book.id}
            to={`/livres/${book.id}`} 
            className="relative group block transition-transform duration-300 "
            style={{ minWidth: '200px' }} // Évite que les images s'écrasent en mobile
          >
            <div className="relative overflow-hidden rounded-t-2xl ">
              <img 
                src={book.coverImageCategorie} 
                alt={book.title}
                className="w-full h-full object-cover pointer-events-none" 
              />
              {/* Overlay : on ajoute pointer-events-none pour qu'il ne bloque pas le clic */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-white text-sm bg-slate-900/50 px-3 py-1 rounded-full">
                  Découvrir
                </span>
              </div>
            </div>
            <p className="text-slate-900 bg-white text-xs py-2 font-bold text-center rounded-b-2xl ">
               {book.id.replace('tome-', 'Tome ')}
            </p>
          </Link>
        ))}
        <div className="h-[0.5px] bg-white w-full" />
        {sorteGraphdBooks.map((book) => (
          <Link 
            key={book.id}
            to={`/livres/${book.id}`} 
            className="relative group block transition-transform duration-300 "
            style={{ minWidth: '200px' }} // Évite que les images s'écrasent en mobile
          >
            <div className="relative overflow-hidden rounded-t-2xl ">
              <img 
                src={book.coverImageCategorie} 
                alt={book.title}
                className="w-full h-full object-cover pointer-events-none" 
              />
              {/* Overlay : on ajoute pointer-events-none pour qu'il ne bloque pas le clic */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="text-white text-sm bg-slate-900/50 px-3 py-1 rounded-full">
                  Découvrir
                </span>
              </div>
            </div>
            <p className="text-slate-900 bg-white text-xs py-2 font-bold text-center rounded-b-2xl ">
               {book.id.replace('tome-', 'Tome ')}
            </p>
          </Link>
        ))}
        

      </div>
    </div>
  </div>
);
};