import { useParams } from 'react-router-dom';
import { BOOKS_DATA, BOOKS_GRAPH_DATA } from '../../data/Book';
import { ReaderModal } from '../../components/ReaderModal';
import { useState } from 'react';
import { Header } from '../../components/Header';

export const BookDetailPage = () => {
  // Récupère l'ID (ex: "tome-1")
  const { id } = useParams(); 
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // On fusionne les deux listes de livres 
  const allBooks = [...BOOKS_DATA, ...BOOKS_GRAPH_DATA];

  // cherche le livre qui a l'ID de l'URL
  const book = allBooks.find((item) => item.id === id);

  // Si false
  if (!book) {
    return <div className="text-white p-20">Livre introuvable : {id}</div>;
  }

  return (
  <div className="w-full flex flex-col items-center"> 
    
    <Header name={'Détails du Tome'}></Header>

    <div className="w-full max-w-360 mx-auto bg-white/80 rounded-[48px] p-8 md:p-12">
      
      {/*  Grid pour Image - Infos - Résumé */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* IMG */}
        <div className="flex justify-center ">
          <img src={book.coverImage} alt={book.title} className="cover rounded-2xl " />
        </div>

       {/* info */}
          <div className="flex flex-col gap-4">
            <div className="font-bold text-sky-700 ">
            <h2>{book.title}</h2>
            <p>{book.subtitle}</p>
            </div>
            <div className="space-y-2 text-sm">
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
                className="text-white text-sm bg-slate-900/50 px-3 py-1 rounded-full transition-all transform hover:bg-sky-700"
              >
                Lire un extrait
              </button>
            </div>
          </div>

        {/* Résumé */}
        <div>
           <p className="font-bold text-sky-700  mb-2">Résumé</p>
           <p className="text-slate-900 leading-relaxed text-sm">{book.summary}</p>
        </div>

      </div>
    </div>
    {isReaderOpen && (
        <ReaderModal 
          url={book.excerptUrl || ""} 
          title={`${book.title}  ${book.subtitle}`}
          onClose={() => setIsReaderOpen(false)} 
        />
      )}
  </div>
);
};

