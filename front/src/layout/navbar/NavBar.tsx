import { useState } from "react"; // 1. BIEN IMPORTER useState
import { Link } from "react-router-dom";
import { Nav } from "./Nav";



const NavBar = () => {
  // 2. DÉCLARER L'ÉTAT (Variable, Fonction de modification)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${isOpen ? 'bg-transparent' : 'bg-white/90 '}
    px-7 py-2.5 md:py-5 rounded-full w-full max-w-7xl `}>
    <div className="flex items-center justify-center gap-16">
        
        {/* LOGO */}
        <Link to="/" className="h-full"><img src="https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772092672/logoNav_rk9sea.png" alt="" /></Link>

        {/* BOUTON BURGER */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          
          className="md:hidden p-2  focus:outline-none absolute top-9 right-10 z-[60]  text-sky-700"
        >
          <div className="space-y-1.5">
            {/* On utilise 'isOpen' (la variable) et pas 'open()' */}
            <span className={`block w-6 h-0.5 bg-sky-700 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-sky-700 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-sky-700 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* LIENS (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Nav color={false} />
        </div>
      </div>

      <div className={`${isOpen ? 'flex' : 'hidden'} md:hidden fixed inset-0 z-50 justify-end`}>
        <div className=" relative flex text-red-50 h-screen w-1/2 bg-white/90 ">

          <Nav 
            onClick={() => setIsOpen(false)}
            style="flex flex-col gap-4  p-4 pt-20 !text-red-50 [&_a]:text-sky-700 text-right h-screen " color={false}          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;