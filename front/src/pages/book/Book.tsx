
import { useParams } from 'react-router-dom';
import { ReaderModal } from '../../components/ReaderModal';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import type { Book } from '../../innterface/book.interface';

export const BookDetailPage = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/book/${id}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBook();
  }, [id]);

  if (loading) return <div className="text-white p-20 text-center">Chargement en cours...</div>;
  
  if (!book) return <div className="text-white p-20 text-center">Livre introuvable : {id}</div>;

  return (
    <div className="w-full flex flex-col items-center"> 
      
      <Header name={ 'Détails du Tome'} />

      <div className="w-full max-w-360 mx-auto bg-white/80 rounded-[48px] p-8 md:p-12 shadow-xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          

          <div className="flex justify-center">
            <img 
              src={book.img ?? ""} 
              alt={book.title ?? "Couverture"} 
              className="cover rounded-2xl shadow-2xl max-h-[500px] object-contain" 
            />
          </div>

          {/* COLONNE 2 : INFOS (Design conservé) */}
          <div className="flex flex-col gap-4">
            <div className="font-bold text-sky-700">
              <h2 className="text-3xl">{book.title}</h2>
              <p className="text-xl opacity-80">{book.subtitle}</p>
            </div>

            <div className="space-y-3 text-sm">
              {/* On vérifie directement les champs comme en back */}
              {book.grandFormat && (
                <p className="text-slate-900">
                  <span className='font-semibold'>Grand format (Lumen) :</span> {book.grandFormat}
                </p>
              )}
              {book.poche && (
                <p className="text-slate-900">
                  <span className='font-semibold'>Format poche (PKJ) :</span> {book.poche}
                </p>
              )}
              {book.collector && (
                <p className="text-slate-900">
                  <span className='font-semibold'>Édition Collector :</span> {book.collector}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button 
                onClick={() => setIsReaderOpen(true)}
                className="text-white text-sm bg-slate-900/50 px-6 py-2 rounded-full transition-all transform hover:bg-sky-700 hover:scale-105 active:scale-95"
              >
                Lire un extrait
              </button>
            </div>
          </div>


          <div className="flex flex-col">
            <p className="font-bold text-sky-700 mb-4 text-lg">Résumé</p>
            <div className="">
              <p className="text-slate-900 leading-relaxed text-sm text-justify">
                {book.summary}
              </p>
            </div>
          </div>

        </div>
      </div>


      {isReaderOpen && (
        <ReaderModal 
          url={book.epubURL ?? ""} 
          title={`${book.title} - ${book.subtitle}`}
          onClose={() => setIsReaderOpen(false)} 
        />
      )}
    </div>
  );
};
