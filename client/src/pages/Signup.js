import React, { useRef, useState } from "react";
import signup from "../assets/signup.svg";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { validate } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [ErrorMsg, setErrorMsg] = useState("");
  const HandleSignUp = () => {
    const message = validate(email.current.value, password.current.value);
    if (message) return;
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setErrorMsg(errorCode + "-" + errorMessage);
      });
  };
  return (
    <div className="absolute flex ">
      <img src={signup} alt="signup" className="w-50 h-50 flex-shrink-0 " />
      <div className="flex flex-col p-10 my-36 mx-auto bg-opacity-80 justify-center ml-5 bg-green-800 rounded-2xl">
        <form
          className="w-64"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="py-4 font-bold text-3xl text-center text-white">
            Sign Up
          </h1>
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-purple-600 text-center flex"
          />

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
          <p className="">{ErrorMsg}</p>
          <div className="flex justify-center">
            <button
              className="p-2 m-2 bg-red-500 text-white justify-center"
              onClick={HandleSignUp}
            >
              Sign Up
            </button>
          </div>

          <p className="cursor-pointer text-white text-center">
            <Link to="/signin">Already a user? Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
