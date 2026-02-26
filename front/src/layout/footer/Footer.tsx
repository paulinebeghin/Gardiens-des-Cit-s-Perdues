import { Link } from "react-router-dom";
import { Nav } from "../navbar/Nav";
import { Facebook } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className=" text-white flex flex-col rounded-3xl bg-slate-900 gap-2.5 md:gap-8 p-5 justify-center items-center text-center mt-10 md:mt-20">
            <Link to="/" className="h-full"><img src="https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772097033/LogoBlancFooter_sup5rk.png" alt="" /></Link>
            <Nav style="flex flex-row justify-between flex-wrap gap-x-1 justify-center" color={true} />
            <div className="flex gap-4 hover:text-blue-950">
                <a href="https://www.facebook.com/lecimap/" target="_blank" rel="noopener noreferrer">
                    <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/christophemaffezzoni" target="_blank" rel="noopener noreferrer">
                    <Instagram size={24} />
                </a>
                <a href="https://www.youtube.com/@pescalaslandas" target="_blank" rel="noopener noreferrer">
                    <Youtube size={24} />
                </a>
            </div>
            
            <Link to="/credit" className="italic font-semibold hover:text-blue-950">Crédit</Link>
            
        </footer>
    )
}





export default Footer;