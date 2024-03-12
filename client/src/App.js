import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import MyProducts from "./pages/MyProducts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Upload from "./pages/Upload";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "myproducts",
        element: <MyProducts />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
