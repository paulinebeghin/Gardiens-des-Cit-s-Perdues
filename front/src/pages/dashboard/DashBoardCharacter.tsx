import { useState, useEffect } from "react";
import { pageService } from "../../api/pageService";
import { CATEGORY_PRIORITY } from "../../data/CategoriesPriority";
import { Header } from "../../components/Header";
import { ArrowLeft, LayoutDashboard, UserCheck, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const DashBoardCharacter = () => {
    // --- ÉTATS ---
    const [pages, setPages] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("PROTAGONISTES");
    const [abilities, setabilities] = useState<string[]>([]); 
    const [family, setfamily] = useState<string[]>([]);   
    const [content, setcontent] = useState<string[]>([]); 
    const [imageCard, setimageCard] = useState("");
    const [imageFull, setimageFull] = useState("");

    const [editingSlug, setEditingSlug] = useState<string | null>(null);

    // --- ACTIONS ---
    const loadPages = async () => {
        try {
            const data = await pageService.getAll();
            setPages(data);
        } catch (err) {
            console.error("Erreur de chargement", err);
        }
    };

    useEffect(() => { loadPages(); }, []);

    const startEdit = (p: any) => {
        setEditingSlug(p.slug);
        setTitle(p.title);
        setabilities(p.abilities || []);
        setfamily(p.family || []);
        setcontent(p.content || []);
        setimageCard(p.imageCard || "");
        setimageFull(p.imageFull || "");
        setCategory(p.category);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { title, category, abilities, family, content, imageCard, imageFull };

        if (editingSlug) {
            await pageService.updateBySlug(editingSlug, data);
            setEditingSlug(null);
        } else {
            const slug = title.toLowerCase().replace(/ /g, "-");
            await pageService.create({ ...data, slug });
        }

        // Reset du form
        setTitle("");
        setabilities([]);
        setfamily([]);
        setcontent([]);
        setimageCard("");
        setimageFull("");
        loadPages();
    };

    const handleDelete = async (slug: string) => {
        if (window.confirm("Supprimer ce personnage ?")) {
            await pageService.delete(slug);
            loadPages();
        }
    };

return (
    <div className=" ">
        <Header name={"DashBoard"} />
        <div className="w-full max-w-7xl  flex flex-col items-start  mb-5">
         <Link to="/dashboard" className="flex items-center gap-2 bg-white/80 text-slate-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-700 hover:text-white transition-all shadow-sm">
            <LayoutDashboard size={16} /> Home DashBoard
         </Link>
      </div>
        
        <div className="p-4 md:p-10 flex  bg-white/90 w-full rounded-[48px] gap-8">
            
            <form onSubmit={handleSubmit} className="w-full lg:w-2/3 border border-slate-900 p-6 rounded-2xl flex flex-col gap-6 h-fit">
                <h3 className="text-2xl font-bold text-sky-700">
                    {editingSlug ? "Modifier le personnage" : "Nouveau personnage"}
                </h3>

                {/* Nom + Catégorie*/}
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="font-semibold text-slate-900">Nom du personnage</label>
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Sophie, Dex ...."
                            className="border border-sky-700 bg-white rounded-full p-2 px-4 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-sky-300"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-slate-900">Catégorie</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            className="border border-sky-700 bg-white rounded-full p-2 px-4 text-sky-700 outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="PROTAGONISTES">Protagonistes</option>
                            <option value="ANTAGONISTES">Antagonistes</option>
                            <option value="CYGNE_NOIR">Cygne Noir</option>
                            <option value="CONSEILS">Conseils</option>
                            <option value="ENTOURAGE_MAJEUR">Entourage Majeur</option>
                        </select>
                    </div>
                </div>

                {/* Talents, Famille, Img */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-900 font-semibold">Talents</label>
                        <textarea
                            placeholder="Télépathe, Polyglotte..."
                            value={abilities.join('\n')}
                            onChange={(e) => setabilities(e.target.value.split('\n'))}
                            className="border border-sky-700 bg-white text-sky-700 rounded-lg p-2 h-32 focus:ring-2 focus:ring-sky-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-slate-900 font-semibold">Famille</label>
                        <textarea
                            placeholder="Grady (père), Edaline (mère)..."
                            value={family.join('\n')}
                            onChange={(e) => setfamily(e.target.value.split('\n'))}
                            className="border border-sky-700 bg-white text-sky-700 rounded-lg p-2 h-32 focus:ring-2 focus:ring-sky-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 font-semibold text-sm">Image Carte (Petite)</label>
                            <input 
                                value={imageCard}
                                onChange={(e) => setimageCard(e.target.value)}
                                className="border border-sky-700 bg-white text-sky-700 rounded-lg p-2 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 font-semibold text-sm">Image Pleine (Grande)</label>
                            <input 
                                value={imageFull}
                                onChange={(e) => setimageFull(e.target.value)}
                                className="border border-sky-700 bg-white text-sky-700 rounded-lg p-2 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-slate-900">Description (Contenu)</label>
                    <textarea
                        placeholder="Une phrase par ligne..."
                        value={content.join('\n')}
                        onChange={(e) => setcontent(e.target.value.split('\n'))}
                        className="border border-sky-700 text-sky-700 bg-white rounded-lg p-2 h-32 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button 
                        type="submit" 
                        className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-bold flex-1 transition-all shadow-md"
                        >
                            {editingSlug ? (
                                <>
                                    <UserCheck size={20} />
                                    Enregistrer
                                </>
                            ) : (
                                <>
                                    <UserPlus size={20} />
                                    Créer le personnage
                                </>
                            )}
                        </button>
                    {editingSlug && (
                        <button type="button" onClick={() => {setEditingSlug(null); setTitle("")}} className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-full font-bold transition-all">
                            Annuler
                        </button>
                    )}
                </div>
            </form>
                    {/* liste perso */}
           <div className="grid grid-cols-1 w-1/3 gap-2">
                {Object.keys(CATEGORY_PRIORITY).map((cat) => {
                const charactersInCategory = pages.filter((p: any) => p.category === cat);
                if (charactersInCategory.length === 0) return null;

                return (
                    <div key={cat} className="flex flex-col gap-2 ">
                        {/* Titre de la catégorie */}
                        <h2 className="font-bold text-sky-700 uppercase tracking-wider text-xs ">
                            {cat.replace("_", " ")} ({charactersInCategory.length})
                        </h2>

                        {/* Conteneur de Scroll Horizontal */}
                        <div className="flex flex-row gap-2 overflow-x-auto pb-4 px-1 snap-x scrollbar-hide custom-scrollbar">
                            {charactersInCategory.map((p: any) => (
                                <div 
                                    key={p.id} 
                                    className="flex-none  snap-start border border-sky-700 p-3 flex flex-col justify-between items-center text-center gap-1.5 bg-slate-50 rounded-xl hover:border-sky-700 transition-colors shadow-sm"
                                >
                                    <div className="overflow-hidden w-full">
                                        <span className="text-slate-900 font-semibold block truncate text-sm">
                                            {p.title}
                                        </span>
                                        <p className="text-[9px] text-slate-400  tracking-tighter truncate">
                                            {p.slug}
                                        </p>
                                    </div>

                                    {/* Trait fin */}
                                    <div className="h-px w-full bg-slate-200"></div>

                                    {/* Boutons d'action */}
                                    <div className="flex flex-row gap-2 w-full justify-center">
                                        <button 
                                            onClick={() => startEdit(p)} 
                                            className="text-sky-600 hover:text-sky-800 font-medium text-[10px]   transition-colors flex-1"
                                        >
                                            Modifier
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(p.slug)} 
                                            className="text-red-500 hover:text-red-700 font-medium text-[10px]   transition-colors flex-1"
                                        >
                                            Suppr.
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
             })}
        </div>
        </div>
    </div>
);
};