// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import signin from "../assets/signin.svg";
// import { validate } from "../utils/validate";
// import { auth } from "../utils/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// const SignIn = () => {
//   const email = useRef(null);
//   const password = useRef(null);
//   const [ErrorMsg, setErrorMsg] = useState("");
//   const HandleSIgnIn = () => {
//     const message = validate(email.current.value, password.current.value);
//     setErrorMsg(message);
//     if (message) return;
//     signInWithEmailAndPassword(
//       auth,
//       email.current.value,
//       password.current.value
//     )
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         setErrorMsg(errorCode + "-" + errorMessage);
//       });
//   };
//   return (
//     <div className=" flex ">
//       <img className="w-75 h-50 flex" src={signin} alt="signin" />
//       <div className="flex flex-col p-10 my-36 mx-auto bg-opacity-80 justify-center ml-5 bg-green-800 rounded-2xl">
//         <form
//           className="w-64"
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <h1 className="py-4 font-bold text-3xl text-center text-white">
//             Sign In
//           </h1>
//           <input
//             type="text"
//             placeholder="Email"
//             ref={email}
//             className="p-2 my-4 w-full bg-purple-600 text-center"
//           />
//           <input
//             placeholder="Password"
//             ref={password}
//             className="p-2 my-4 w-full bg-purple-600 text-center"
//           />
//           <p className="text-red-600">{ErrorMsg}</p>
//           <div className="flex justify-center">
//             <button
//               className="p-2 m-2 bg-red-500 text-white justify-center"
//               onClick={HandleSIgnIn}
//             >
//               Sign in
//             </button>
//           </div>
//           <p className="p-2 m-2 text-white">
//             <Link to="/signup">New to SellProGPT? Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import { useState, useEffect } from "react";
import { signin, authenticate, isAuthenticated } from "../apiCalls/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import toast from "react-hot-toast";
import signin1 from "../assets/signin.svg";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  useEffect(() => {
    if (isAuthenticated()) navigate("/products");
  }, [navigate]); // Pass navigate as a dependency

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const { email, password, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false });
          toast.error(data.error);
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading: false,
            });
          });
          toast.success("Signed in successfully!");
          navigate("/products"); // Use navigate instead of history.push
        }
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        toast.error("Connection failed, please try again.");
      });
  };

  return (
    <>
      <title>SellPro: Sign In</title>
      <main>
        <div className="h-screen flex items-center justify-center bg-gray-800">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl shadow-2xl p-8 md:p-16 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div>
              <img
                src={signin1}
                alt="Sign In"
                className="hidden md:block"
                height="360px"
                width="420px"
              />
            </div>
            <div className="w-full max-w-md space-y-4">
              <h1 className="text-4xl text-center md:text-left font-semibold text-gray-200">
                Sign In
              </h1>
              <p className="text-lg text-gray-300 text-center md:text-left">
                Sign in now to get full access to our site ✌
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full border-gray-300 border rounded-md py-2 px-3 text-gray-900 mt-1"
                    required
                    value={email}
                    onChange={handleChange("email")}
                    minLength="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="block w-full border-gray-300 border rounded-md py-2 px-3 text-gray-900 mt-1"
                      required
                      value={password}
                      onChange={handleChange("password")}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 py-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                  <Link to="/signup" className="text-gray-300">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
