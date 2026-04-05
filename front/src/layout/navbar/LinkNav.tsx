import { Link } from "react-router-dom"



export const LinkNav = ({ text, link, onClick }: any) => {
  return (
    <li>
      <Link 
        to={link} 
        onClick={onClick}
       
        className={`transition-colors hover:text-sky-700 font-semibold duration-200 `}
      >
        {text}
      </Link>
    </li>
  );
}
