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
import Admin from "./pages/Admin";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Core/Layout";
import theme from "./theme";
import { Toaster } from "react-hot-toast";
import appStore from "./utils/appStore";
import { Provider, useSelector } from "react-redux";
import GptSearch from "../src/components/GptSearch";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <ChakraProvider theme={theme}>
          <Header />

          <Outlet />
          <Toaster />
        </ChakraProvider>
      </Provider>
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
        path: "gptSearch",
        element: <GptSearch />,
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
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
