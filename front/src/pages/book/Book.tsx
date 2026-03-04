import { Link, useParams } from 'react-router-dom';
import { BOOKS_DATA, BOOKS_GRAPH_DATA } from '../../data/Book';
import { ReaderModal } from '../../components/ReaderModal';
import { useState } from 'react';
import { Header } from '../../components/Header';

export const BookDetailPage = () => {
  // Récupère l'ID (ex: "tome-1") depuis l'URL /livre/:id
  const { id } = useParams(); 
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // On fusionne les deux listes de livres pour être sûr de tout trouver
  const allBooks = [...BOOKS_DATA, ...BOOKS_GRAPH_DATA];

  // ACTION CRUCIALE : On cherche le livre qui a l'ID de l'URL
  const book = allBooks.find((item) => item.id === id);

  // Si l'ID dans l'URL ne correspond à rien dans BOOKS_DATA
  if (!book) {
    return <div className="text-white p-20">Livre introuvable : {id}</div>;
  }

  return (
  <div className="w-full flex flex-col items-center"> {/* Parent qui centre le tout */}
    
    <Header name={'Détails du Tome'}></Header>

    {/* BLOC BLANC : on utilise min-w-full ou w-full avec mx-auto */}
    <div className="w-full max-w-[1440px] mx-auto bg-white/80 rounded-[48px] p-8 md:p-12">
      
      {/* Contenu interne : Utilise Grid pour séparer Image / Infos / Résumé */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Colonne 1: Image */}
        <div className="flex justify-center ">
          <img src={book.coverImage} alt={book.title} className="cover rounded-2xl " />
        </div>

        {/* Colonne 2: Infos */}
       {/* Colonne 2: Infos */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-sky-700 uppercase">{book.title}</h2>
            <div className="space-y-2">
              {book.releaseDates.grandFormat && (
                <p className="text-slate-900"><span className='font-semibold'>Grand format (Lumen) :</span> {book.releaseDates.grandFormat}</p>
              )}
              {book.releaseDates.poche && (
                <p className="text-slate-900"><span className='font-semibold'>Format poche (PKJ) :</span> {book.releaseDates.poche}</p>
              )}
              {book.releaseDates.date && (
                <p className="text-slate-900"><span className='font-semibold'>Date de sortie :</span> {book.releaseDates.date}</p>
              )}
            </div>

            <div className="mt-4">
              <button 
                onClick={() => setIsReaderOpen(true)}
                className="text-white text-sm bg-slate-900/50 px-3 py-1 rounded-full transition-all transform hover:bg-slate-900"
              >
                Lire un extrait
              </button>
            </div>
          </div>

        {/* Colonne 3: Résumé */}
        <div>
           <p className="font-bold text-sky-700 uppercase mb-2">Résumé</p>
           <p className="text-slate-900 leading-relaxed">{book.summary}</p>
        </div>

      </div>
    </div>
    {isReaderOpen && (
        <ReaderModal 
          url={book.excerptUrl || ""} 
          title={book.title} 
          onClose={() => setIsReaderOpen(false)} 
        />
      )}
  </div>
);
};