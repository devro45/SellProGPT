import React, { useState } from "react";
import { Box, Flex, IconButton, Button, Stack, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../apiCalls/auth";
import { signout } from "../../apiCalls/auth";
import toast from "react-hot-toast";

const NavItems = [
  { text: "Products", href: "/products" },
  { text: "My Products", href: "/myproducts" },
  { text: "Upload", href: "/upload" },
  { text: "My Cart", href: "/cart" },
];

const NavLink = ({ text, href, currentRoute }) => (
  <Link to={href} style={{ textDecoration: "none" }}>
    <Button
      px={2}
      py={1}
      bg={href === currentRoute ? "gray.700" : "none"}
      rounded={"md"}
      _hover={{
        bg: "green.400",
      }}
    >
      {text}
    </Button>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signout(() => {
      window.location.href = "/";
    });
    toast.success("Signed out successfully.");
  };

  return (
    <Box
      bg="gray.900"
      px={4}
      pos="fixed"
      top="0"
      w={"full"}
      boxShadow={"lg"}
      zIndex="999"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={handleToggle}
        />
        <Stack spacing={8} alignItems={"center"}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              px={2}
              py={1}
              bg="none"
              rounded={"md"}
              _hover={{
                color: "white",
              }}
              color="green.400"
              fontSize="2xl"
              fontFamily="cursive"
            >
              SellPro
            </Button>
          </Link>
          <Stack as={"nav"} spacing={4} direction="row">
            {NavItems.map((item) => (
              <NavLink
                key={item.href}
                text={item.text}
                href={item.href}
                currentRoute={currentRoute}
              />
            ))}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <NavLink text="Admin" href="/admin" currentRoute={currentRoute} />
            )}
          </Stack>
        </Stack>
        <Flex alignItems={"center"}>
          {isAuthenticated() ? (
            <Stack spacing={4} direction="row">
              <Text>
                {isAuthenticated().user.role === 1 ? "(Admin)" : ""}{" "}
                {isAuthenticated().user.email}
              </Text>
              <Button
                variant={"solid"}
                colorScheme={"red"}
                size={"sm"}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Stack>
          ) : (
            <Stack spacing={4} direction="row">
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button variant={"solid"} colorScheme={"green"} size={"sm"}>
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button variant={"solid"} colorScheme={"green"} size={"sm"}>
                  Sign Up
                </Button>
              </Link>
            </Stack>
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {NavItems.map((item) => (
              <NavLink
                key={item.href}
                text={item.text}
                href={item.href}
                currentRoute={currentRoute}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
