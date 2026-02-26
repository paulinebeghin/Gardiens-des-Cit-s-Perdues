import { Link } from "react-router-dom"

interface Props {
    text : string,
    link : string
    onClick?: () => void;
}

export const LinkNav = ({text, link, onClick} : Props) => {
  return (
    <li>
        {/* On ajoute className="block" pour cliquer plus facilement et la couleur héritée */}
        <Link 
            to={link} 
            onClick={onClick} 
            className="hover:opacity-70 font-semibold transition-opacity"
        >
            {text}
        </Link>
    </li>
  )
}