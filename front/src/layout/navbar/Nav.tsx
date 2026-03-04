import { LinkNav } from "./LinkNav"
import type { ReactNode } from "react"


interface NavProps {
    children?: ReactNode
    onClick?: () => void; // On dit que onClick est une fonction optionnelle
    style?: string;
    color : boolean
}

export const Nav = ({ color, onClick, style }: NavProps) => {
    const links = [
        {
            text: "Accueil",
            link : "/"
        },
        {
            text: "Personnages",
            link : "/categorie"
        },
        {
            text: "Livres",
            link : "/livres"
        },
        {
            text: "Univers",
            link : "/univers"
        },
        {
            text: "Contact",
            link : "/contact"
        }
    ]
   return (
    <nav className="w-full md:w-auto   ">

      <ul className={`flex items-center  md:gap-10 ${color? 'text-white' : 'text-slate-900'}  ${style}`}>
        {links.map((link, index) => (
          <LinkNav key={index} text={link.text} onClick={onClick} link={link.link}  />
        ))}
      </ul>
      
    </nav>
  );
}
