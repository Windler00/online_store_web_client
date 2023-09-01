import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout/Layout';
import './index.css'
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Profile from './pages/Profile/Profile';
import Product from './pages/Product/Product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home></Home></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login></Login></Layout>,
  },
  {
    path: "/registration",
    element: <Layout><Registration></Registration></Layout>,
  },
  {
    path: "/profile",
    element: <Layout><Profile></Profile></Layout>,
  },
  {
    path: "/product/:ProductId",
    element: <Layout><Product></Product></Layout>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
