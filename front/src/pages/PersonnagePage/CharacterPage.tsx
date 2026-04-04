import { useParams } from 'react-router-dom';
import { useFetchCharacter } from '../../api/page';

const CharacterPage = () => {

  const { slug } = useParams<{ slug: string }>();

  const { character, loading, error } = useFetchCharacter(slug);

  if (loading) return <div className="loader">Chargement des cristaux...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!character) return null;

  return (
    <div className="flex flex-col items-center w-full">

      <h1 className="text-6xl max-sm:text-3xl text-center text-white py-10">{character.title}</h1>

      <div className="w-full max-w-360 bg-white/80 rounded-[48px] p-8 md:p-12 flex flex-col items-center gap-14">


        <div className="overflow-hidden rounded-full border-2 border-sky-700 w-full max-w-139.75 ">

          <img
            src={character.imageFull || character.imageCard}
            alt={character.title}
            className="w-full h-full rounded-full object-cover"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 xl:px-20 gap-10 w-full text-left">

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

          <div className="md:col-span-8 flex flex-col gap-5">
            {character.content.map((p: string, i: number) => (
              <p
                key={i}
                className="text-base leading-relaxed text-slate-900 wrap-break-word whitespace-pre-wrap"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default CharacterPage;