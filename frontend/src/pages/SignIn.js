import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import signin from "../assets/signin.svg";
import { validate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const SignIn = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [ErrorMsg, setErrorMsg] = useState("");
  const HandleSIgnIn = () => {
    const message = validate(email.current.value, password.current.value);
    setErrorMsg(message);
    if (message) return;
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + "-" + errorMessage);
      });
  };
  return (
    <div className=" flex ">
      <img className="w-75 h-50 flex" src={signin} alt="signin" />
      <div className="flex flex-col p-10 my-36 mx-auto bg-opacity-80 justify-center ml-5 bg-green-800 rounded-2xl">
        <form
          className="w-64"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="py-4 font-bold text-3xl text-center text-white">
            Sign In
          </h1>
          <input
            type="text"
            placeholder="Email"
            ref={email}
            className="p-2 my-4 w-full bg-purple-600 text-center"
          />
          <input
            placeholder="Password"
            ref={password}
            className="p-2 my-4 w-full bg-purple-600 text-center"
          />
          <p className="text-red-600">{ErrorMsg}</p>
          <div className="flex justify-center">
            <button
              className="p-2 m-2 bg-red-500 text-white justify-center"
              onClick={HandleSIgnIn}
            >
              Sign in
            </button>
          </div>
          <p className="p-2 m-2 text-white">
            <Link to="/signup">New to SellProGPT? Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
