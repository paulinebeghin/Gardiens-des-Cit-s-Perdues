import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";
const Layout = () => {
  return (
    <div className="p-5 flex flex-col  ">
        <div className="fixed top-0 left-0  mb-10 md:mb-20 w-full z-50 flex justify-center p-5">
        <NavBar />
        </div>
      <main className=" grow   pt-30 md:pt-40">
        <Outlet  /> {/* C'est ICI que Home sera injecté */}
      </main>
      <Footer/>
      {/* Ton Footer ici */}
    </div>
  )
}
export default Layout;