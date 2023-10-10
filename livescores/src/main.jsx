import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css';
import ErrorPage from "./Pages/error-page.jsx";
import Signup from './Pages/signup.jsx';
import Login from './Pages/login.jsx';
import RegisterSucess from "./Pages/register-success.jsx"
import loginSuccess from './Pages/login-sucess.jsx';
import LoginSuccess from './Pages/login-sucess.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: '*',
    element: <ErrorPage />,
  },

  {
    path: "/signup",
    element: <Signup />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/register/success",
    element: <RegisterSucess />
  },
  
  {
    path: "/login/success",
    element: <LoginSuccess />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
