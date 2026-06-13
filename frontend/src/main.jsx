import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

console.log("MAIN ");


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


