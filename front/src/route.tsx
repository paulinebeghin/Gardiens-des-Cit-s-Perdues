import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/home/Home";
import { AllCategoriesPage } from "./pages/allCategorie/AllCategoriesPage";
import CharacterPage from "./pages/PersonnagePage/CharacterPage";
import { Univer } from "./pages/univer/Univer";
import { CatalogueBook } from "./pages/book/CatalogueBook";
import { BookDetailPage } from "./pages/book/Book";
import { ContactPage } from "./pages/contact/ContactPages";
import { NotFound } from "./pages/404/404NotFound";
import { AuthPage } from "./pages/auth/AuthPages";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashBoardCharacter } from "./pages/dashboard/DashBoardCharacter";
import { DashBoardBook } from "./pages/dashboard/DashBoardBook";
import { DashBoard } from "./pages/dashboard/DashBoard";

export const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/personnages", 
        element: <AllCategoriesPage />
      },
      {
        path: "/personnage/:slug",
        element: <CharacterPage />
      },
     
      {
        path: "/univers",
        element: <Univer/>
      },
      {
        path: "/livres",
        element: <CatalogueBook/>
      },
      {
        path: "/livres/:id",
        element: <BookDetailPage/>
      },
      {
        path: "/contact",
        element: <ContactPage/>
      },
      {
        path: "*", 
        element: <NotFound/>, 
      },
      {
        path: "/auth",
        element: <AuthPage onAuth={() => {}} />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><DashBoard/></ProtectedRoute>,
      },
      {
        path: "/dashboardcharacter",
        element: <ProtectedRoute><DashBoardCharacter/></ProtectedRoute>,
      },
      {
        path: "/dashboardbook",
        element: <ProtectedRoute><DashBoardBook/></ProtectedRoute>,
      }
    ]
  }
])