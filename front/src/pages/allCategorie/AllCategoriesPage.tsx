import { useEffect, useState } from 'react';
import { CharacterCard } from '../../components/CharacterCard';

//Les élement qui vont êtres utiliser
interface Character {
  id: string;
  title: string;
  slug: string;
  imageCard: string;
  category: string;
}

export const AllCategoriesPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  ///Tu appelles ton serveur. 
  // Dès que le serveur répond, tu mets les données dans ton état characters.
  // Le [] à la fin signifie : "Fais ça une seule fois quand la page s'affiche".

  //ranger les données back
  useEffect(() => {
    // On récupère TOUT le monde du back
    fetch(`http://localhost:3000/api/pages`)
      .then(res => res.json())
      .then(data => setCharacters(data));
  }, []);


  //Crée une liste de catégories uniques (new Set)
  const categories = [...new Set(characters.map(char => char.category))];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-16">
      <h1 className="text-5xl font-black text-center mb-12">L'Encyclopédie des Cités</h1>

        {/* ///Elle crée une <section> pour chaque groupe (ex: Une section pour le "Cygne Noir", une pour le "Conseil"). */}
      {categories.map(cat => (
        <section key={cat} className="space-y-6">
          {/* Titre de la catégorie */}
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-red-700 uppercase tracking-tighter">
               {/* Ça transforme CYGNE_NOIR en CYGNE NOIR. */}
              {cat.replace('_', ' ')}  
            </h2>
            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          </div>

          {/* Grille des personnages pour CETTE catégorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {characters
            // À l'intérieur de la section "Conseil", on ne garde que les personnages dont la catégorie est "Conseil".
              .filter(char => char.category === cat)
              .map(char => (
                // Pour chacun de ces personnages filtrés, on affiche une CharacterCard.
                <CharacterCard key={char.id} character={char} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};