import React, { useState, useEffect } from "react";
import NoAccess from "../components/Core/NoAccess";
import MyProducts from "../components/PageComponents/MyProducts";
import { isAuthenticated } from "../apiCalls/auth";

const MyProductsPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) setIsSignedIn(true);
  }, []);

  return (
    <>
      <title>{isSignedIn ? "My Products" : "Access Denied"}</title>

      <main>{isSignedIn ? <MyProducts /> : <NoAccess />}</main>
    </>
  );
};

export default MyProductsPage;
