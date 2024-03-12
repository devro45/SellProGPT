import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between bg-black w-full">
      <div className="flex ">
        <div
          className="font-semibold m-4 text-green-700 flex p-2 cursor-pointer"
          style={{
            fontWeight: "700",
            fontFamily: "cursive",
            fontStyle: "normal",
          }}
        >
          <Link to="/">SellProGPT</Link>
        </div>

        <div className="flex text-white">
          <ul className="flex p-2 m-3">
            <li className="px-4 p-1 hover:bg-green-500 hover:rounded cursor-pointer">
              <Link to="/products">Products</Link>
            </li>
            <li className="px-4 p-1  hover:bg-green-500 hover:rounded cursor-pointer">
              <Link to="/myproducts">My Products</Link>
            </li>
            <li className="px-4 p-1  hover:bg-green-500 hover:rounded cursor-pointer">
              <Link to="/upload">Upload</Link>
            </li>
            <li className="px-4 p-1  hover:bg-green-500 hover:rounded cursor-pointer ">
              <Link to="/cart"> My Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-black ">
        <button className="p-2 m-3 bg-green-400 rounded">
          <Link to="/signin">Sign In</Link>
        </button>
        <button className="p-2 m-3 bg-green-400 rounded">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
