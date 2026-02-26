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

//choisir l'ordre
const CATEGORY_PRIORITY: Record<string, number> = {
  "PROTAGONISTES": 1,
  "ANTAGONISTES" : 2,
  "CONSEIL": 3,
  "CYGNE_NOIR": 4,
  "MENTOR": 5,
  "AUTRE": 6
};
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



// Liste unique de categoris + avec ordre choisie
const categories = [...new Set(characters.map(char => char.category))]
  .sort((a, b) => {
    // On récupère le numéro de priorité (ou 99 si la catégorie n'est pas dans la liste)
    const priorityA = CATEGORY_PRIORITY[a] || 99;
    const priorityB = CATEGORY_PRIORITY[b] || 99;
    
    return priorityA - priorityB;
  });
  return (
    <div>

      <h1 className="text-5xl text-[48px] md:text-[128px] text-center mb-12">Personnages</h1>

    <div className="max-w-[1440px]  flex flex-col gap-14 p-12  border border-white rounded-[48px] ">

        {/* ///Elle crée une <section> pour chaque groupe (ex: Une section pour le "Cygne Noir", une pour le "Conseil"). */}
      {categories.map(cat => (
      <section key={cat} className="flex flex-col max-md:grid gap-14">

          {/* Titre de la catégorie */}
          <div className="flex items-center ">
            <p className="font-bold text-slate-900 py-5 px-7 tracking-tighter  bg-white/90 rounded-full">

               {/* Ça transforme CYGNE_NOIR en CYGNE NOIR. */}
              {cat.replace('_', ' ')}  
            </p> 

          </div>

          {/* Grille des personnages pour CETTE catégorie */}

          <div className="flex flex-nowrap overflow-x-auto  
                  md:flex-wrap md:overflow-visible 
                  scrollbar-hide"> 
    {characters
      .filter(char => char.category === cat)
      .map(char => (
        // min-w-[250px] est crucial pour que les cartes ne s'écrasent pas sur mobile
        <div key={char.id} className="min-w-[280px] md:min-w-0">
          <CharacterCard character={char} />
        </div>
      ))}
  </div>
        </section>
      ))}
    </div>
    </div>
  );
};