import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    // min-h-screen : pour que le footer reste en bas si la page est vide
    // items-center : pour centrer horizontalement tous les enfants directs
    <div className="flex flex-col items-center min-h-screen p-5">
      
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-5">
        <NavBar />
      </div>

      {/* w-full et max-w-7xl : pour que le contenu ne soit pas trop large sur grand écran */}
      <main className="pt-30">
        <Outlet />
      </main>

      {/* On entoure le Footer pour garantir son centrage */}
      <footer className="w-full flex justify-center ">
        <Footer />
      </footer>
      
    </div>
  )
}
export default Layout;