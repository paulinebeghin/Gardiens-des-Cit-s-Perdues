import { ReactReader } from 'react-reader';

interface ReaderProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const ReaderModal = ({ url, title, onClose }: ReaderProps) => {

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-slate-900/70 backdrop-blur-2xl p-2 md:p-10">
      <div className="relative w-full h-full max-w-5xl  rounded-2xl overflow-hidden  flex flex-col">
        
        {/* Header du lecteur epub */}
        <div className="flex justify-between items-center p-5 bg-linear-to-r from-sky-700 to-slate-900 ">
          <div className="flex flex-col">
            
            <h3 className="text-white font-bold text-base md:text-lg italic">
              {title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 bg-white/10 hover:bg-red-500/50 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-white/20"
          >
            <span className="font-bold">Fermer</span>
            <span className="group-hover:rotate-90 transition-transform text-lg">✕</span>
          </button>
        </div>

        {/* Partie lecture */}
        <div className="flex-1 relative h-full">
          <ReactReader
            url={url}
            title={title}
            location={0}
            swipeable={true}
        
            epubOptions={{
              flow: 'scrolled',
              manager: 'continuous',
              width: '100%'
            }}
            locationChanged={() => {}}
          />
        </div>
      </div>
    </div>
  );
};