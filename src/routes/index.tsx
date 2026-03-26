import { createHashRouter } from "react-router";

import Login from "../views/Login";
import Cart from "../views/front/Cart";
import Home from "../views/front/Home";
import Products from "../views/front/Products";
import NotFound from "../views/front/NotFound";
import Checkout from "../views/front/Checkout";
import FrontendLayout from "../layout/FrontendLayout";
import SingleProduct from "../views/front/SingleProduct";

const routes = [
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
const router = createHashRouter(routes);

export default router;
