import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import type { Book } from '../../innterface/book.interface';
import { Plus, Pencil, Trash2, LayoutDashboard, X, Save } from 'lucide-react';

export const DashBoardBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '', subtitle: '', titleCategory: '', img: '', imgCategory: '', graph: '', summary: '', epubURL: '', grandFormat: '', poche: '', collector: '', category: 'BOOK'
  });

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/book');
      const data = await response.json();
      setBooks(data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (book: Book) => {
    setEditingId(book.id);
    setFormData({
      title: book.title ?? '',
      subtitle: book.subtitle ?? '',
      titleCategory: book.titleCategory ?? '',
      img: book.img ?? '',
      graph: book.graph ?? '',
      imgCategory: book.imgCategory ?? '',
      summary: book.summary ?? '',
      epubURL: book.epubURL ?? '',
      grandFormat: book.grandFormat ?? '',
      poche: book.poche ?? '',
      collector: book.collector ?? '',
      category: book.category ?? 'BOOK'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '', subtitle: '', titleCategory: '', img: '', imgCategory: '',
      summary: '', epubURL: '', grandFormat: '', graph: '', poche: '', collector: '',
      category: 'BOOK'
    });
  };

  const handleSubmit = async () => {
    const url = editingId
      ? `http://localhost:3000/api/book/${editingId}`
      : 'http://localhost:3000/api/book';

    const method = editingId ? 'PATCH' : 'POST';

    const dataToSend: any = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        dataToSend[key] = value;
      }
    });

    console.log("Données nettoyées envoyées :", dataToSend);

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert(editingId ? "Livre mis à jour !" : "Livre créé !");
        cancelEdit();
        fetchBooks();
      } else {
        const err = await response.json();
        console.error("Erreur API détaillée :", err);
        alert("Erreur : " + (err.message || "Vérifie les champs vides"));
      }
    } catch (error) {
      alert("Erreur serveur ou réseau");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce livre ?")) {
      await fetch(`http://localhost:3000/api/book/${id}`, { method: 'DELETE' });
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const renderBookCard = (book: Book) => (
    <div key={book.id} className={`bg-white border ${editingId === book.id ? 'border-sky-700 ring-1 ring-sky-700' : ''} rounded-2xl p-4 flex items-center justify-between group transition-all `}>
      <div className="flex items-center gap-4 truncate">
        <img src={book.img ?? ''} className="w-10 h-14 object-cover rounded-md bg-slate-100" alt="" />
        <div className="truncate">
          <p className="font-bold text-slate-900 text-sm truncate">{book.title}</p>
          <p className="text-sky-700 text-[10px] uppercase font-bold">{book.titleCategory || "Unique"}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => handleDelete(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all">
          <Trash2 size={16} />
        </button>
        <button onClick={() => handleEditClick(book)} className="p-2 text-sky-700 hover:bg-sky-50 rounded-full transition-all">
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center min-h-screen pb-10">
      <Header name="Gestion des Livres" />

      <div className="w-full flex flex-col items-start mb-5 px-4">
        <Link to="/dashboard" className="flex items-center gap-2 bg-white/80 text-slate-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-700 hover:text-white transition-all">
          <LayoutDashboard size={16} /> Retour Dashboard
        </Link>
      </div>

      <div className="w-full mx-auto bg-white/80  rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row gap-10">

        <div className="w-full lg:w-2/3 border border-slate-900 rounded-[48px] p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-sky-700">
              {editingId ? "Modifier le livre" : "Nouveau livre"}
            </h2>
            {editingId && (
              <button onClick={cancelEdit} className="text-red-500 flex items-center gap-1 text-sm font-bold">
                <X size={16} /> Annuler
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='flex flex-col gap-2'>
              <label className="font-semibold text-slate-900">Titre du livre</label>
              <input name="title" value={formData.title} onChange={handleChange} type="text" className="border border-sky-700 bg-white rounded-full p-2 px-4 outline-none" />
            </div>

            <div className='flex flex-col gap-2'>
              <label className="font-semibold text-slate-900">Catégorie</label>
              <select name="category" value={formData.category} onChange={handleChange} className="border border-sky-700 bg-white rounded-full p-2 px-4 outline-none placeholder:text-sky-700">
                <option value="BOOK">Roman</option>
                <option value="BOOK_GRAPH">Roman Graphique</option>
              </select>
            </div>

            <p className="font-semibold text-slate-900 ">Date de sortie</p>
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4  border-sky-100 ">

              <div className='flex flex-col gap-2'>

                <label className="font-semibold text-slate-900 text-sm" >Grand Format</label>
                <input name="grandFormat" value={formData.grandFormat} onChange={handleChange} type="text" placeholder="15/05/2014" className="border placeholder:text-sky-700 border-sky-700 rounded-full p-2 px-4 outline-none focus:border-sky-700 bg-white" />
              </div>
              <div className='flex flex-col gap-2'>
                <label className="font-semibold text-slate-900 text-sm ">Poche</label>
                <input name="poche" value={formData.poche} onChange={handleChange} type="text" placeholder="16/02/2017" className="border placeholder:text-sky-700 border-sky-700 rounded-full p-2 px-4 outline-none focus:border-sky-700 bg-white" />
              </div>
              <div className='flex flex-col gap-2'>
                <label className="font-semibold text-slate-900 text-sm ">Collector</label>
                <input name="collector" value={formData.collector} onChange={handleChange} type="text" placeholder="04/04/2024" className="border border-sky-700 placeholder:text-sky-700 rounded-full p-2 px-4 outline-none focus:border-sky-700 bg-white" />
              </div>
              <div className='flex flex-col gap-2'>
                <label className="font-semibold text-slate-900 text-sm ">Graphique</label>
                <input name="graph" value={formData.graph} onChange={handleChange} type="text" placeholder="04/12/2025" className="border border-sky-700 placeholder:text-sky-700 rounded-full p-2 px-4 outline-none focus:border-sky-700 bg-white" />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className="font-semibold text-slate-900 ">Sous-titre</label>
              <input name="subtitle" value={formData.subtitle} onChange={handleChange} type="text" className="border border-sky-700 bg-white rounded-full p-2 px-4 outline-none" />
            </div>

            <div className='flex flex-col gap-2'>
              <label className="font-semibold text-slate-900 ">Image fond catégorie (URL)</label>
              <input name="imgCategory" value={formData.imgCategory} onChange={handleChange} type="text"
              placeholder="https:// ..." className="border border-sky-700 placeholder:text-sky-700 bg-white rounded-full p-2 px-4 outline-none" />
            </div>

            <div className='flex flex-col gap-2'>
              <label className="font-semibold text-slate-900 ">Image Couverture (URL)</label>
              <input name="img" value={formData.img} onChange={handleChange} type="text" placeholder="https:// ... " className="border border-sky-700 placeholder:text-sky-700 bg-white rounded-full p-2 px-4 outline-none" />
            </div>

            <div className='flex flex-col gap-2'>
              <label className="font-semibold text-slate-900 ">Tome / Volume</label>
              <input name="titleCategory" value={formData.titleCategory} onChange={handleChange} type="text" className="border border-sky-700 bg-white rounded-full p-2 px-4 outline-none" />
            </div>

            <div className='md:col-span-2 flex flex-col gap-2'>
              <label className="font-semibold text-slate-900">Lien ePub</label>
              <input name="epubURL" value={formData.epubURL} onChange={handleChange} type="text" placeholder="https://..." className="border border-sky-700 placeholder:text-sky-700 bg-white rounded-full p-2 px-4 outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-900 font-semibold mb-2">Résumé</label>
              <textarea name="summary" value={formData.summary} onChange={handleChange} rows={4} className="w-full bg-white border border-sky-700 rounded-2xl px-5 py-3 outline-none" />
            </div>
          </div>

          <button onClick={handleSubmit} className={`mt-8 ${editingId ? 'bg-slate-900' : 'bg-sky-700'} text-white px-10 py-3 rounded-full font-bold hover:opacity-90 shadow-lg flex items-center gap-2 transition-all`}>
            {editingId ? <Save size={20} /> : <Plus size={20} />}
            {editingId ? "Sauvegarder les modifications" : "Enregistrer le livre"}
          </button>
        </div>

        {/* liste livre */}
        <div className="w-full lg:w-1/3 ">
          <h3 className="text-sky-700 font-bold uppercase text-xs mb-6">
            Livres enregistrés ({books.length})
          </h3>

          <div className="flex flex-col gap-8 h-full pr-2">

            {/* SECTION ROMANS */}
            <div className="flex flex-col">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">
                Romans ({books.filter(b => b.category === "BOOK").length})
              </h4>
              {/* Scroll dédié aux Romans */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-sky-200 pr-2">
                {books
                  .filter((b) => b.category === "BOOK")
                  .sort((a, b) => (a.titleCategory || "").localeCompare(b.titleCategory || "", undefined, { numeric: true }))
                  .map((book) => renderBookCard(book))}
              </div>
            </div>

            {/* SECTION ROMANS GRAPHIQUES */}
            <div className="flex flex-col">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">
                Romans Graphiques ({books.filter(b => b.category === "BOOK_GRAPH").length})
              </h4>

              {/* Scroll dédié aux Romans Graphiques */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-sky-200 pr-2">
                {books
                  .filter((b) => b.category === "BOOK_GRAPH")
                  .sort((a, b) => {
                    return a.id > b.id ? 1 : -1;
                  })
                  .map((book) => renderBookCard(book))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};