import { useState } from "react";
import { ImCreditCard } from "react-icons/im";
import { FiKey } from "react-icons/fi";
import {
  Stack,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { isAuthenticated } from "../../apiCalls/auth";
import { emptyCart } from "../../apiCalls/cart";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const CheckoutItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color="gray.400">
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

const Checkout = ({
  amount,
  isDisabled,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const makePayment = async (token) => {
    const { token: authToken } = isAuthenticated();
    const body = {
      token,
      amount,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };
    try {
      const response = await fetch(`${API}/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success("Payment successful.");
        emptyCart();
        setReload(!reload);
      } else {
        throw new Error("Payment failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <Center h="100%">
      <Stack
        spacing="8"
        borderWidth="2px"
        rounded="lg"
        padding="8"
        width="70%"
        bgColor="gray.800"
        boxShadow="2xl"
      >
        <Heading size="md">Order Summary</Heading>
        <Stack spacing="6">
          <CheckoutItem label="Subtotal" value={`₹${amount}`} />
          <CheckoutItem label="Shipping + Tax">
            <ChakraLink href="#" textDecor="underline">
              Calculate shipping
            </ChakraLink>
          </CheckoutItem>
          <CheckoutItem label="Coupon Code">
            <ChakraLink href="#" textDecor="underline">
              Add coupon code
            </ChakraLink>
          </CheckoutItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total Amount
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              ₹{amount}
            </Text>
          </Flex>
        </Stack>
        {isAuthenticated() ? (
          <StripeCheckout
            stripeKey={process.env.STRIPE_KEY}
            token={makePayment}
            amount={amount * 100}
            image="https://user-images.githubusercontent.com/77770628/178572835-0ff7e41c-9edc-4a70-8148-b36dae89e4a6.png"
            name={`Pay ₹${amount} to SellPro`}
            description="Happy shopping with SellPro 🛍️"
            email={isAuthenticated().user.email}
            shippingAddress
            billingAddress
            currency="INR"
          >
            <Button
              bgColor="green.600"
              color="white"
              size="lg"
              fontSize="md"
              rightIcon={<ImCreditCard />}
              boxShadow="2xl"
              _hover={{
                transform: "translateY(4px)",
                backgroundColor: "green.800",
              }}
              _active={{
                backgroundColor: "green.800",
              }}
              disabled={isDisabled}
            >
              Checkout
            </Button>
          </StripeCheckout>
        ) : (
          <>
            <Button
              bgColor="green.600"
              color="white"
              size="lg"
              fontSize="md"
              rightIcon={<FiKey />}
              boxShadow="2xl"
              _hover={{
                transform: "translateY(4px)",
                backgroundColor: "green.800",
              }}
              _active={{
                backgroundColor: "green.800",
              }}
              onClick={() => navigate("/signin")} // Use navigate instead of history.push
            >
              Sign in
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Checkout;
