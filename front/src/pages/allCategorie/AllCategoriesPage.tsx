import { useEffect, useState } from 'react';
import { CharacterCard } from '../../components/CharacterCard';
import { Header } from '../../components/Header';
import { CATEGORY_PRIORITY } from '../../data/categories';
import { SearchBar } from '../../components/SearchBar';

interface Character {
  id: string;
  title: string;
  slug: string;
  imageCard: string;
  category: string;
}

export const AllCategoriesPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/pages`)
      .then(res => res.json())
      .then(data => setCharacters(data));
  }, []);

  // Filtrer les personnages selon la recherche
  const filteredCharacters = characters.filter(char =>
    char.title.toLowerCase().includes(search.toLowerCase())
  );

  // Extraire et trier les catégories
  const categories = [...new Set(filteredCharacters.map(char => char.category))]
    .sort((a, b) => {
      const priorityA = CATEGORY_PRIORITY[a.trim().toUpperCase()] || 99;
      const priorityB = CATEGORY_PRIORITY[b.trim().toUpperCase()] || 99;
      return priorityA - priorityB;
    });

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Header name={'Personnages'} />
      
      {/* Ta barre de recherche importée */}
      <SearchBar value={search} onChange={setSearch} />

      <div className="w-full  p-12 border border-white rounded-[48px] ">
        
        {search !== "" ? (
          /* --- MODE RECHERCHE : Grille simple sans titres --- */
          <div className="flex flex-wrap gap-7 justify-center w-full">
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map(char => (
                <div key={char.id}>
                  <CharacterCard character={char} />
                </div>
              ))
            ) : (
              <p className="text-white italic mx-auto max-w-[90%] text-center wrap-break-word">
  Aucun personnage trouvé pour "{search}"
</p>
            )}
          </div>
        ) : (
          /* --- MODE NORMAL : Ton design original par catégories --- */
          <div className="flex flex-col gap-14">
            {categories.map(cat => (
              <section key={cat} className="flex flex-col max-md:grid gap-14">
                {/* Titre de la catégorie  */}
                <div className="flex items-center ">
                  <p className="font-bold text-slate-900 py-5 px-7 tracking-tighter bg-white/90 rounded-full">
                    {cat.trim().replace(/_/g, ' ')}
                  </p> 
                </div>

                {/* Grille horizontale/verticale */}
                <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible gap-7 scrollbar-hide"> 
                  {characters
                    .filter(char => char.category === cat)
                    .map(char => (
                      <div key={char.id}>
                        <CharacterCard character={char} />
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};