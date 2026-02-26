import React, { type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom' 
import './index.css' 

// Tes Imports de pages
import CharacterPage from './pages/PersonnagePage/CharacterPage.tsx'
import { CategoryPage } from './pages/categoriePersonnage/CategorieCharacterPage.tsx'
import { AllCategoriesPage } from './pages/allCategorie/AllCategoriesPage.tsx'
import Layout from './layout/Layout.tsx'
import { Home } from './pages/home/Home.tsx'

// Système de protection de route
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userToken') ? true : false;
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }
  return <>{children}</>;
};

// Définition du Router
const router = createBrowserRouter([
  {
    element: <Layout />, // Le Layout contient ta Navbar et l'Outlet pour les pages
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/categorie", 
        element: <AllCategoriesPage />
      },
      {
        path: "/categorie/:catName", // Décommenté pour que tes boutons fonctionnent !
        element: <CategoryPage />
      },
      {
        path: "/personnage/:slug",
        element: <CharacterPage />
      },
      {
        path: "/contact",
        element: <div className="p-10">Page Contact (En construction)</div>
      },
      {
        path: "/univers",
        element: <div className="p-10">L'Univers des Cités (En construction)</div>
      },
      {
        path: "/homepage-privee", // Changé le nom pour éviter la confusion avec Home
        element: <ProtectedRoute><div className="p-10">Espace Privé</div></ProtectedRoute>, 
      },
      {
        path: "*", // Page 404
        element: <div className="p-10 text-center text-2xl">Oups ! Cette page n'existe pas.</div>, 
      }
    ]
  }
])

// Un seul rendu final
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)