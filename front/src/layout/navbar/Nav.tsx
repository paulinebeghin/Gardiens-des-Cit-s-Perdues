import { LinkNav } from "./LinkNav"
import type { ReactNode } from "react"


interface NavProps {
    children?: ReactNode
    onClick?: () => void; // On dit que onClick est une fonction optionnelle
    style?: string;
    color : boolean
}

export const Nav = ({ children, color, onClick, style }: NavProps) => {
    const links = [
        {
            text: "Accueil",
            link : "/"
        },
        {
            text: "Personnages",
            link : "/prestations"
        },
        {
            text: "Livres",
            link : "/pages/tarifs"
        },
        {
            text: "Univers",
            link : "/pages/actus"
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
