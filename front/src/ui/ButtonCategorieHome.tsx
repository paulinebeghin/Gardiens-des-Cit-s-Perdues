import { Link } from "react-router-dom";

interface Props {
  name: string;
  url: string;
  urlImg: string;
  alt: string;
}

export const ButtonCategorieHome = ({ url, name, urlImg, alt }: Props) => {
  return (
    <Link to={url} className="group flex flex-col items-center w-25  md:w-[280px]">
      {/* Partie Image : Forme de voûte (Arche) */}
      <div className="w-full aspect-[4/5] overflow-hidden bg-white/80 rounded-t-full border-t-2 border-x-2 border-white/20 shadow-lg">
        <img 
          src={urlImg} 
          alt={alt} 
          className="w-full h-full object-cover border-white group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Partie Texte : Le socle blanc */}
      <div className="w-full py-4 bg-white rounded-b-2xl  mt-[-2px]">
        <span className="block text-center text-slate-900 font-medium  tracking-wide">
          {name}
        </span>
      </div>
    </Link>
  );
};