import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import './index.css' 
import CharacterPage from './pages/PersonnagePage/CharacterPage.tsx'
import { AllCategoriesPage } from './pages/allCategorie/AllCategoriesPage.tsx'
import { Home } from './pages/home/Home.tsx'
import { Univer } from './pages/univer/Univer.tsx'
import { CatalogueBook } from './pages/book/CatalogueBook.tsx'
import { BookDetailPage } from './pages/book/Book.tsx'
import React from 'react'
import { Layout } from './layout/Layout.tsx'
import { ContactPage } from './pages/contact/ContactPages.tsx'
import { NotFound } from './pages/404/404NotFound.tsx'
import { AuthPage } from './pages/auth/AuthPages.tsx'
import { DashBoard } from './pages/dashboard/DashBoard.tsx'
import { ProtectedRoute } from './ProtectedRoute.tsx'

const router = createBrowserRouter([
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
        path: "/auth", // co au dashboard
        element: <AuthPage onAuth={function (): void {
          throw new Error('Function not implemented.')
        } }/>, 
      },
      {
        path: "/dashboard", // dashboard
        // element: <DashBoard/>, 
        element: <ProtectedRoute><DashBoard/></ProtectedRoute>, 
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)