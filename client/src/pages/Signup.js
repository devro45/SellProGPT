// import React, { useRef, useState } from "react";
// import signup from "../assets/signup.svg";
// import { Link } from "react-router-dom";
// import { auth } from "../utils/firebase";
// import { validate } from "../utils/validate";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// const Signup = () => {
//   const email = useRef(null);
//   const password = useRef(null);
//   const [ErrorMsg, setErrorMsg] = useState("");
//   const HandleSignUp = () => {
//     const message = validate(email.current.value, password.current.value);
//     if (message) return;
//     createUserWithEmailAndPassword(
//       auth,
//       email.current.value,
//       password.current.value
//     )
//       .then((userCredential) => {
//         // Signed up
//         const user = userCredential.user;
//         console.log(user);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//         setErrorMsg(errorCode + "-" + errorMessage);
//       });
//   };
//   return (
//     <div className="absolute flex ">
//       <img src={signup} alt="signup" className="w-50 h-50 flex-shrink-0 " />
//       <div className="flex flex-col p-10 my-36 mx-auto bg-opacity-80 justify-center ml-5 bg-green-800 rounded-2xl">
//         <form
//           className="w-64"
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <h1 className="py-4 font-bold text-3xl text-center text-white">
//             Sign Up
//           </h1>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="p-2 my-4 w-full bg-purple-600 text-center flex"
//           />

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
//           <p className="">{ErrorMsg}</p>
//           <div className="flex justify-center">
//             <button
//               className="p-2 m-2 bg-red-500 text-white justify-center"
//               onClick={HandleSignUp}
//             >
//               Sign Up
//             </button>
//           </div>

//           <p className="cursor-pointer text-white text-center">
//             <Link to="/signin">Already a user? Sign In</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Image,
  Center,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { signup } from "../apiCalls/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import signupImg from "../assets/signup.svg";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const { name, email, password, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false });
          toast.error(data.error);
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            loading: false,
          });
          toast.success("Signed up successfully! Please sign in now.");
          navigate("/signin"); // Use navigate instead of history.push
        }
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        toast.error("Connection failed, please try again.");
      });
  };

  return (
    <>
      <main>
        <Center h="100vh" bg="gray.800">
          <Stack
            direction={{ base: "column", md: "row" }}
            bgGradient="linear(to-r, #03203C, #1C8D73)"
            boxShadow="2xl"
            spacing="16"
            borderRadius="3xl"
            px="4"
            align={"center"}
            justify={"center"}
          >
            <Box>
              <Image
                src={signupImg}
                height="360px"
                width="420px"
                display={{ base: "none", md: "block" }}
              />
            </Box>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign Up
                </Heading>
                <Text fontSize={"lg"} color={"gray.300"}>
                  To buy & sell products & grow your network &#9996;
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <form onSubmit={handleSubmit}>
                    {/* <HStack> */}
                    <Box>
                      <FormControl id="Name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          required
                          value={name}
                          onChange={handleChange("name")}
                          minLength="3"
                          maxLength="32"
                        />
                      </FormControl>
                    </Box>
                    {/* </HStack> */}
                    <FormControl id="email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={handleChange("email")}
                        minLength="7"
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={handleChange("password")}
                          minLength="6"
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type="submit"
                        loadingText="Signing Up"
                        isLoading={loading}
                        size="lg"
                        bg={"green.600"}
                        color={"white"}
                        _hover={{
                          bg: "green.400",
                        }}
                        focus={{
                          bg: "green.400",
                        }}
                      >
                        Sign up
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        Already a user? <Link to="/signin">Sign In</Link>
                      </Text>
                    </Stack>
                  </form>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Center>
      </main>
    </>
  );
};

export default SignUp;
