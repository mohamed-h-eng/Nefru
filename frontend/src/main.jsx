import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

console.log("MAIN ");


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


