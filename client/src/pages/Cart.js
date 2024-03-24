import React, { useState, useEffect } from "react";
import { emptyCart, loadProductsFromCart } from "../apiCalls/cart";
import {
  SimpleGrid,
  Heading,
  Center,
  VStack,
  Box,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import ProductCard from "../components/Core/ProductCard";
import { BiShoppingBag } from "react-icons/bi";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";

// Import Checkout directly instead of using dynamic import
import Checkout from "../components/Core/Checkout";

const MyCartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [reload, setReload] = useState(false);

  let totalPrice = 0;

  useEffect(() => {
    // Load cart products on component mount and reload changes
    setCartProducts(loadProductsFromCart());
  }, [reload]);

  // Calculate total price
  cartProducts.map((product) => {
    totalPrice += product.price;
  });

  return (
    <>
      <header>
        <title>My Cart</title>
      </header>
      <main>
        <>
          <Stack
            minH="100vh"
            direction={{ base: "column", md: "column", lg: "row" }}
          >
            <Center w="60%" mt={cartProducts.length > 2 ? 24 : 12}>
              <VStack>
                {cartProducts.length > 0 ? (
                  <>
                    <HStack spacing="8">
                      <Heading
                        size={{ base: "md", md: "lg" }}
                        color="green.400"
                      >
                        My Cart ({cartProducts.length} products)
                      </Heading>
                      <Button
                        colorScheme="teal"
                        onClick={() => {
                          emptyCart();
                          setReload(!reload);
                        }}
                        rightIcon={<GiEmptyMetalBucketHandle />}
                      >
                        Empty Cart
                      </Button>
                    </HStack>
                    <SimpleGrid
                      pt={10}
                      pb={12}
                      spacing="8"
                      columns={{ base: 1, md: 2, lg: 2 }}
                    >
                      {cartProducts.map((product, index) => (
                        <ProductCard
                          product={product}
                          key={index}
                          onCartPage={true}
                          setReload={setReload}
                          reload={reload}
                        />
                      ))}
                    </SimpleGrid>
                  </>
                ) : (
                  <>
                    <VStack spacing="8">
                      <Heading align="center">
                        You haven't added any product to cart yet.
                      </Heading>
                      <Button
                        colorScheme="teal"
                        size="lg"
                        rightIcon={<BiShoppingBag />}
                        onClick={() => (window.location.href = "/products")} // Redirect to products page
                      >
                        Start shopping now
                      </Button>
                    </VStack>
                  </>
                )}
              </VStack>
            </Center>
            <Box
              w="40%"
              pos="sticky"
              top="0"
              right="0"
              h="100vh"
              bgColor="gray.900"
            >
              <Checkout
                amount={totalPrice}
                isDisabled={cartProducts.length < 1}
                setReload={setReload}
                reload={reload}
              />
            </Box>
          </Stack>
        </>
      </main>
    </>
  );
};

export default MyCartPage;
