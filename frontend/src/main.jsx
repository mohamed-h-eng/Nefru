import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./store/store";
// import AuthRefresh from "./shared/components/AuthRefresh/AuthRefresh";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <AuthRefresh /> */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)


