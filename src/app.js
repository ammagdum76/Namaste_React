import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import {Body} from "./components/Body"
// import Body from "./components/Body"
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet, Form } from "react-router-dom";

const Applayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

// Router configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
