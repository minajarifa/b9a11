import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Authentication/Login.jsx";
import Register from "./Pages/Authentication/Register.jsx";
import ErrorPage from "./Layouts/ErrorPage.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Booked from "./Pages/Booked/Booked.jsx";
import Manage from "./Pages/Manage/Manage.jsx";
import Add from "./Pages/Add/Add.jsx";
import ServiceToDo from "./Pages/ServiceToDo/ServiceToDo.jsx";
import SingleServices from "./Pages/SingleServices/SingleServices.jsx";
import AllServices from "./Pages/AllServices/AllServices.jsx";
import DetailsCard from "./Pages/DetailsCard/DetailsCard.jsx";
import PrivetRouters from "./Layouts/PrivetRouters.jsx";
import AddApply from "./Pages/AddApply/AddApply.jsx";
import Updated from "./Pages/Updated/Updated.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Booked",
        element: <PrivetRouters><Booked /></PrivetRouters>,
      },
      {
        path: "/DetailsCard/:id",
        element: <PrivetRouters><DetailsCard /></PrivetRouters>,
        loader: ({ params }) => fetch(`https://b9a11-server-red.vercel.app/tutor/${params.id}`),
      },
      {
        path: "/Manage",
        element: <PrivetRouters><Manage /></PrivetRouters>,
      },
      {
        path: "/Add",
        element: <PrivetRouters><Add /></PrivetRouters>,
      },
      {
        path: "/AddApply/:id",
        element: <PrivetRouters><AddApply /></PrivetRouters>,
        loader: ({ params }) => fetch(`https://b9a11-server-red.vercel.app/tutor/${params.id}`),
      },
      {
        path: "/Updated/:id",
        element: <PrivetRouters><Updated /></PrivetRouters>,
        loader: ({ params }) => fetch(`https://b9a11-server-red.vercel.app/tutor/${params.id}`),
      },
      {
        path: "/ServiceToDo",
        element: <PrivetRouters><ServiceToDo /></PrivetRouters>,
      },
      {
        path: "/SingleServices",
        element: <PrivetRouters><SingleServices /></PrivetRouters>,
      },
      {
        path: "/AllServices",
        element: <AllServices />,
        loader: () => fetch('https://b9a11-server-red.vercel.app/productsCount'),
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
