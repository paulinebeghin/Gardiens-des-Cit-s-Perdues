
import { useParams } from 'react-router-dom';
import { useFetchCharacter } from '../../api/page';


const CharacterPage = () => {
  //React Router regarde l'adresse du site recupe slug
  const { slug } = useParams<{ slug: string }>();
  // On utilise notre logique séparée montre l'état de la page si il est en recherche ect useFetchCharacter relier a page.ts
  const { character, loading, error } = useFetchCharacter(slug);

  if (loading) return <div className="loader">Chargement des cristaux...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!character) return null;

return (
<div className="flex flex-col items-center w-full">
  {/* Titre */}
  <h1 className="text-6xl max-sm:text-3xl text-center text-white py-10">{character.title}</h1>

  {/* Conteneur Blanc - max-w doit correspondre à celui de la navbar */}
  <div className="w-full max-w-360 bg-white/80 rounded-[48px] p-8 md:p-12 flex flex-col items-center gap-14">
    
    {/* Image de l'avatar */}
    <div className="overflow-hidden rounded-full border-2 border-sky-700 w-full max-w-139.75 ">

            <img

              src={character.imageFull || character.imageCard}
              alt={character.title}
              className="w-full h-full rounded-full object-cover"

            />

          </div>

    {/* Section Infos - Utilisation de Grid pour bien répartir la largeur */}
    <div className="grid grid-cols-1 md:grid-cols-12 xl:px-20 gap-10 w-full text-left">
      
      {/* Colonne Gauche (Nom/Famille) - prend 4 colonnes sur 12 */}
      <div className="md:col-span-4 flex flex-col gap-4">
        <div>
          <p className="font-bold text-sky-700 uppercase tracking-wide">Nom</p>
          <p className="text-sm text-slate-900">{character.title}</p>
        </div>
        
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sky-700 uppercase tracking-wide">Famille</p>
          {character.family.map((a: string) => (
            <span key={a} className="text-sm text-slate-900">{a}</span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-sky-700 uppercase tracking-wide">
    Talent{character.abilities.length > 1 ? 's' : ''}
  </p>
          {character.abilities.map((a: string) => (
            <span key={a} className="text-sm text-slate-900">{a}</span>
          ))}
        </div>
      </div>

      {/* Colonne Droite (Description) - prend 8 colonnes sur 12 */}
      <div className="md:col-span-8 flex flex-col gap-5">
        {character.content.map((p: string, i: number) => (
          <p key={i} className="text-base leading-relaxed text-slate-900">
            {p}
          </p>
        ))}
      </div>

    </div>
  </div>
</div>
)




//  return (
//     <div className="max-w-5xl mx-auto p-8">
//       {/* Container principal en Grid : 1 col sur mobile, 3 cols sur desktop */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
//         {/* Côté gauche : Image et Titre (prend 1 col) */}
//         <aside className="flex flex-col gap-4">
//           <div className="overflow-hidden rounded-lg shadow-lg bg-gray-100 aspect-[3/4]">
//             <img 
//               src={character.imageFull || character.imageCard} 
//               alt={character.title} 
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <h1 className="text-4xl font-bold text-red-600 uppercase tracking-wider">
//             {character.title}
//           </h1>
//           <div className="inline-block px-3 py-1 text-sm font-semibold bg-gray-800 text-white rounded-full w-fit">
//             {character.category}
//           </div>
//         </aside>

//         {/* Côté droit : Infos détaillées (prend 2 cols) */}
//         <main className="md:col-span-2 flex flex-col gap-8">
          
//           {/* Section Talents */}
//           <section>
//             <h3 className="text-xl font-bold border-b-2 border-gold-500 mb-4 pb-1">Talents</h3>
//             <div className="flex flex-col gap-2">
//               {character.abilities.map((a: string) => (
//                 <span key={a} className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-medium shadow-sm">
//                   {a}
//                 </span>
//               ))}
//             </div>
//           </section>

//           {/* Section Histoire */}
//           <section>
//             <h3 className="text-xl font-bold border-b-2 border-gold-500 mb-4 pb-1">Histoire</h3>
//             <div className="space-y-4">
//               {character.content.map((p: string, i: number) => (
//                 <p key={i} className="text-gray-700 leading-relaxed text-lg">
//                   {p}
//                 </p>
//               ))}
//             </div>
//           </section>

//         </main>
//       </div>
//     </div>
//   );
};

export default CharacterPage;