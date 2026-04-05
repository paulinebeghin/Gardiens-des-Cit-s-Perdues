import { Link } from "react-router-dom";
import type { Book } from "../innterface/book.interface";

export const BookItem = ({ book }: { book: Book }) => (
  <Link 
    to={`/livres/${book.id}`} 
    className="relative group block transition-transform duration-300 hover:scale-105"
    style={{ minWidth: '200px' }} 
  >
    <div className="relative overflow-hidden rounded-t-2xl shadow-lg">
      <img 
        
        src={book.imgCategory || book.img || "https://placehold.co/200x300?text=Pas+d'image"} 
        alt={book.title}
        className="w-full h-full object-cover pointer-events-none aspect-2/3" 
      />
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
        <span className="text-white text-sm bg-slate-900/70 px-4 py-2 rounded-full ">
          Découvrir
        </span>
      </div>
    </div>
    <p className="text-slate-900 bg-white text-xs py-3 font-bold text-center rounded-b-2xl border-t border-slate-100">
       
       {book.id.includes('tome-') ? book.id.replace('tome-', 'Tome ') : book.titleCategory}
    </p>
  </Link>
);