import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CharacterCard } from '../../components/CharacterCard';


export const CategoryPage = () => {
  const { catName } = useParams();
  // Remplace ton useState actuel par celui-ci
const [characters, setCharacters] = useState<Character[]>([]);

interface Character {
  id: string;
  title: string;
  slug: string;
  imageCard: string;
  category: string;
}

  useEffect(() => {
    fetch(`http://localhost:3000/characters/category/${catName}`)
      .then(res => res.json())
      .then(data => setCharacters(data));
  }, [catName]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-6xl max-sm:text-3xl text-center text-white py-10 uppercase">
      </h1>
        {catName?.replace('_', ' ')}

      {characters.length === 0 ? (
        <p className="text-gray-500">Aucun personnage dans cette catégorie pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {characters.map(char => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  );
};