import {
  Box,
  ChakraComponent,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Footer from "./footer";
import Navbar from "./navbar";
import React from "react";

export default function Container({
  children,
  ...props
}: React.ComponentProps<ChakraComponent<"main">>) {
  const { width } = props;

  const Wrapper = React.useMemo(
    () => (width === "full" ? Stack : Box),
    [width]
  );
  return (
    <Box minH="100vh" h="full" flexDirection={"column"} display="flex">
      <Navbar minHeight="14" />
      {/* @ts-expect-error Props */}
      <Wrapper
        flex="1"
        h="full"
        as="main"
        marginTop={"14"}
        paddingInline={{ base: "6", md: "10" }}
        paddingBlock={{ base: "8", md: "12" }}
        backgroundColor={useColorModeValue("white", "gray.800")}
        {...props}
        {...(width !== "full"
          ? {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }
          : {})}
      >
        {width !== "full" ? (
          <Stack
            width="full"
            maxWidth="4xl"
            mx={{ base: "8", md: "16" }}
            gap={"4"}
          >
            {children}
          </Stack>
        ) : (
          children
        )}
      </Wrapper>
      <Footer />
    </Box>
  );
}
