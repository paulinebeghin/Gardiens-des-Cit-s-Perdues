import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Book, Users, ArrowRight } from "lucide-react"; // Optionnel : pnpm install lucide-react

export const DashBoard = () => {
    return (
        <div className=" w-full flex flex-col items-center">
            <Header name={"DashBoard"} />

            <div className="w-full max-w-5xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Gestion Personnages */}
                    <Link 
                        to={"/dashboardcharacter"} 
                        className="group relative bg-white/80 rounded-[40px] p-10 flex flex-col items-center gap-6 transition-all duration-500 hover:bg-sky-700 "
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-sky-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                            <Users size={40} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-sky-900 group-hover:text-white transition-colors">
                                Gestion Personnages
                            </h2>
                            <p className="text-slate-900 mt-2 group-hover:text-white transition-colors">
                                Modifier les talents, les familles et les descriptions des héros.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sky-700 font-semibold group-hover:text-white mt-4">
                            Accéder <ArrowRight size={18} />
                        </div>
                    </Link>

                    {/* Gestion Livres */}
                    <Link 
                        to={"/dashboardbook"} 
                        className="group relative bg-white/80 rounded-[40px] p-10 flex flex-col items-center gap-6 transition-all duration-500 hover:bg-sky-700 "
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-sky-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                            <Book size={40} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-sky-900 group-hover:text-white transition-colors">
                                Gestion Livres
                            </h2>
                            <p className="text-slate-900 mt-2 group-hover:text-white transition-colors ">
                                Ajouter des tomes, modifier les résumés et les dates de sortie.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sky-700 font-semibold group-hover:text-white mt-4">
                            Accéder <ArrowRight size={18} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};