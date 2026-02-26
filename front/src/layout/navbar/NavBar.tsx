import { useState } from "react"; // 1. BIEN IMPORTER useState
import { Link } from "react-router-dom";
import { Nav } from "./Nav";



const NavBar = () => {
  // 2. DÉCLARER L'ÉTAT (Variable, Fonction de modification)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${isOpen ? 'bg-transparent' : 'bg-white/90  '}
    px-7 py-2.5 md:py-5 rounded-full w-full max-w-[1440px] `}>
    <div className="flex items-center max-md:justify-between justify-center items-center gap-16">
        
        {/* LOGO BASE*/}
        <Link 
  to="/" 
  className={`h-full  ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
>
  <img 
    src="https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772092672/logoNav_rk9sea.png" 
    alt="Logo" 
  />
</Link>

        {/* BOUTON BURGER */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          
          className="md:hidden p-2  focus:outline-none absolute top-10 right-10 z-[60]  text-sky-700"
        >
          <div className="space-y-1.5">
            {/* On utilise 'isOpen' (la variable) et pas 'open()' */}
            <span className={`block w-6 h-0.5 bg-sky-700 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-sky-700 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-sky-700 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* NAV LINK */}
        <div className="hidden md:flex space-x-6">
          <Nav color={false} />
        </div>
      </div>

      <div className={`${isOpen ? 'flex' : 'hidden'} md:hidden fixed inset-0 z-50 justify-end`}>
  
  {/* MENU BURGER OPEN */}
  <div className="relative flex flex-col h-screen w-2/3 py-30 sm:w-1/3 bg-white/95 shadow-2xl animate-in slide-in-from-right duration-300">
    
    {/* --- AJOUT DU LOGO ICI --- */}
    <div className="flex justify-center border-b  border-gray-100">
      <Link to="/" onClick={() => setIsOpen(false)}>
        <img 
          src="https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772092672/logoNav_rk9sea.png" 
          alt="Logo" 
          className="h-10 w-auto" // Ajuste la taille selon ton logo
        />
      </Link>
    </div>

    {/* Tes liens de navigation */}
    <Nav 
      onClick={() => setIsOpen(false)}
      style="flex flex-col gap-6 p-10 text-right font-bold text-sky-900" 
      color={false} 
    />
  </div>
</div>
    </nav>
  );
}

export default NavBar;