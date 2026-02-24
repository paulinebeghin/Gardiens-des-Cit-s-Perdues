
import { useParams } from 'react-router-dom';
import { useFetchCharacter } from '../../api/page';


const CharacterPage = () => {
  const { slug } = useParams<{ slug: string }>();
  // On utilise notre logique séparée
  const { character, loading, error } = useFetchCharacter(slug);

  if (loading) return <div className="loader">Chargement des cristaux...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!character) return null;

  return (
    <div className="profile-container">
      {/* Côté gauche : Image et Identité */}
      <aside className="profile-sidebar">
        <img src={character.imageFull} alt={character.title} className="main-img" />
        <h1 className="title-gold">{character.title}</h1>
        <div className="category-label">{character.category}</div>
      </aside>

      {/* Côté droit : Infos détaillées */}
      <main className="profile-content">
        <section className="info-section">
          <h3>Talents</h3>
          <div className="badge-grid">
            {character.abilities.map((a: string) => <span key={a} className="ability-badge">{a}</span>)}
          </div>
        </section>

        <section className="text-section">
          <h3>Histoire</h3>
          {character.content.map((p: string, i: number) => (
            <p key={i} className="content-paragraph">{p}</p>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CharacterPage;