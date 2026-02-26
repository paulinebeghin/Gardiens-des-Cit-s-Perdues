import { Link } from 'react-router-dom';

// 1. On définit la structure de la donnée attendue
interface CharacterProps {
  character: {
    id: string;
    title: string;
    slug: string;
    imageCard: string;
    category: string;
  };
}

// 2. On applique le type aux arguments de la fonction
export const CharacterCard = ({ character }: CharacterProps) => (
  <Link 
    to={`/personnage/${character.slug}`} 
    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 block"
  >
    <div className="aspect-[4/5] overflow-hidden bg-gray-200">
      <img 
        src={character.imageCard} 
        alt={character.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="p-4 bg-white">
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
        {character.title}
      </h3>
      <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
        {character.category}
      </p>
    </div>
  </Link>
);