
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import './index.css' 
// Tes Imports de pages
import CharacterPage from './pages/PersonnagePage/CharacterPage.tsx'

import { AllCategoriesPage } from './pages/allCategorie/AllCategoriesPage.tsx'
import Layout from './layout/Layout.tsx'
import { Home } from './pages/home/Home.tsx'
import { Univer } from './pages/univer/Univer.tsx'
import { CatalogueBook } from './pages/book/CatalogueBook.tsx'
import { BookDetailPage } from './pages/book/Book.tsx'
import ContactPage from './pages/contact/ContactPages.tsx'
import NotFound from './pages/404/404NotFound.tsx'
import React from 'react'

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
        path: "*", // Page 404
        element: <NotFound/>, 
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