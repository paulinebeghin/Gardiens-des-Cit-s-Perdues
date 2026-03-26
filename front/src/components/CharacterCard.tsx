import { Link } from 'react-router-dom';

interface CharacterProps {
  character: {
    id: string;
    title: string;
    slug: string;
    imageCard: string;
    category: string;
  };
}

export const CharacterCard = ({ character }: CharacterProps) => (
  <Link 
    to={`/personnage/${character.slug}`} 
    className="group bg-white/80 rounded-2xl py-7 px-4 grid gap-5 overflow-hidden w-50 "
>
    <div className="overflow-hidden border border-sky-700 rounded-full ">
      <img 
        src={character.imageCard} 
        alt={character.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="text-sm text-center">
      <p className='font-bold text-sky-700'>Nom</p>
      <p className="text-slate-900">{character.title}</p>
      
    </div>
  </Link>
);

