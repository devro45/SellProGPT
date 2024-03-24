import React, { useState, useEffect } from "react";
import NoAccess from "../components/Core/NoAccess";
import UploadProduct from "../components/PageComponents/UploadProduct";
import { isAuthenticated } from "../apiCalls/auth";

const UploadPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) setIsSignedIn(true);
  }, []);

  return (
    <>
      <title>{isSignedIn ? "Upload Product" : "Access Denied"}</title>
      <main>{isSignedIn ? <UploadProduct /> : <NoAccess />}</main>
    </>
  );
};

export default UploadPage;
