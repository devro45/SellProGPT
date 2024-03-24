import React from "react";
import { Box, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import signin1 from "../../assets/signin1.svg";
const NoAccess = () => {
  return (
    <Center height="100vh" width="95vw">
      <Stack direction={{ base: "column", md: "row" }}>
        <Box textAlign="center" py={10} px={6}>
          <FaExclamationTriangle size={50} color={"orange"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            <Text color="red">Access Denied!</Text>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Text color="green" cursor="pointer" as="u">
                Please Sign in to continue
              </Text>
            </Link>
          </Heading>
          <Text color={"gray"}>
            This feature is only available for registered users.
            <br /> Please sign in to your account and start using SellPro for
            free. No credit card required.
          </Text>
        </Box>
        <Box>
          <Image
            src={signin1}
            alt="signin photo"
            height={{ base: "300px", md: "360px" }}
            width={{ base: "250px", md: "300px" }}
          />
        </Box>
      </Stack>
    </Center>
  );
};

export default NoAccess;
