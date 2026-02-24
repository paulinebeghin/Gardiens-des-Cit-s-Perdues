import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import React, { type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom' 
import './index.css' 
import CharacterPage from './pages/PersonnagePage/CharacterPage.tsx'


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userToken') ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    element:"" ,
    children: [
      {
        path: "/", // Utilise "/" pour la page d'accueil par défaut
        element: ""
      },
      {
        path: "/home",
        element: "<Home />"
      },
      {
        path: "/prestations/", 
        element: ""
      },
        {
          path: "/personnage/:slug", // Utilise ":slug" pour les routes dynamiques
          element: <CharacterPage/>
        },
       
        {
          path: "*",
          element: "", 
        },
       
        {
          path: "/contact",
          element: ""
        },
        {
          path: "/homepage",
          element: <ProtectedRoute>""</ProtectedRoute>, 
        },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Remplace BrowserRouter + App par RouterProvider */}
    <RouterProvider router={router} />
  </React.StrictMode>
)