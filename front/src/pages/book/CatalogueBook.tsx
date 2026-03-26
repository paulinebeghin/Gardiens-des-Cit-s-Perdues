import { Link } from 'react-router-dom';
import { BOOKS_DATA, BOOKS_GRAPH_DATA  } from '../../data/Book';
import { Header } from '../../components/Header';
import { BOOK_GRAPH_PRIORITY, BOOK_PRIORITY } from '../../data/BookPriority';

export const CatalogueBook = () => {
    const sortedBooks = [...BOOKS_DATA].sort((a, b) => {
    const priorityA = BOOK_PRIORITY[a.id] || 99;
    const priorityB = BOOK_PRIORITY[b.id] || 99;
    
    return priorityA - priorityB;
  });
    const sorteGraphdBooks = [...BOOKS_GRAPH_DATA].sort((a, b) => {
    const priorityA = BOOK_GRAPH_PRIORITY[a.id] || 99;
    const priorityB = BOOK_GRAPH_PRIORITY[b.id] || 99;
    
    return priorityA - priorityB;
  });
  
   return (
  <div className="">
    <Header name={'Livres'}></Header>
    
    <div className=" mx-auto border border-white rounded-[48px] p-8 ">
      <div className=" flex flex-wrap md:flex-wrap gap-7  justify-center">
        {/* Partie roman */}
        {sortedBooks.map((book) => (
          <Link 
            key={book.id}
            to={`/livres/${book.id}`} 
            className="relative group block transition-transform duration-300 "
            style={{ minWidth: '200px' }} 
          >
            <div className="relative overflow-hidden rounded-t-2xl ">
              <img 
                src={book.coverImageCategorie} 
                alt={book.title}
                className="w-full h-full object-cover pointer-events-none" 
              />
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
        {/* Partie graphique */}
        <div className="h-[0.5px] bg-white w-full" />
        {sorteGraphdBooks.map((book) => (
          <Link 
            key={book.id}
            to={`/livres/${book.id}`} 
            className="relative group block transition-transform duration-300 "
            style={{ minWidth: '200px' }} 
          >
            <div className="relative overflow-hidden rounded-t-2xl ">
              <img 
                src={book.coverImageCategorie} 
                alt={book.title}
                className="w-full h-full object-cover pointer-events-none" 
              />
              
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