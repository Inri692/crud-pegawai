import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../page/Home";
import Edit from "../page/Edit";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
