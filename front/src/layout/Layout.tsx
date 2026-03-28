import { Outlet } from "react-router-dom";
// import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";
import { MouseMagic } from "../components/MouseMagic";
import { NavBar } from "./navbar/NavBar";

export const Layout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <MouseMagic/>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-5 ">
        <NavBar />
      </div>
      {/* CONTENU */}
      <main className="w-full pt-32 max-w-[1440px]">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="w-full flex justify-center">
        <Footer />
      </footer>

    </div>
  )
};