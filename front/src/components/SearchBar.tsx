import { Search } from "lucide-react";

interface SearchBarProps {
  value: string; // texte recherche
  onChange: (val: string) => void; //Met a jour le texte écrit dans la barre de recherche
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-15 w-2/3 flex gap-3 px-5 py-3 rounded-full bg-white/80 text-slate_900 placeholder:text-slate-900/80 ">
        
        <Search className="text-slate-900/80"/>
      <input
        placeholder="Rechercher un personnage..."
        className=" outline-none w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    </div>
  );
};

