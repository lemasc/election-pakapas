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
  transparent,
  ...props
}: React.ComponentProps<ChakraComponent<"main">> & {
  transparent?: boolean;
}) {
  const { width } = props;

  const Wrapper = React.useMemo(
    () => (width === "full" ? Stack : Box),
    [width]
  );

  const fullWidth = transparent || width === "full";
  return (
    <Box minH="100vh" h="full" flexDirection={"column"} display="flex">
      <Navbar transparent={transparent} minH={"14"} />
      {/* @ts-expect-error Props */}
      <Wrapper
        flex="1"
        h="full"
        as="main"
        marginTop={transparent ? undefined : "14"}
        paddingInline={!fullWidth ? { base: "6", md: "10" } : undefined}
        paddingBlock={fullWidth ? undefined : { base: "8", md: "12" }}
        backgroundColor={useColorModeValue("white", "gray.800")}
        {...props}
        {...(!fullWidth
          ? {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }
          : {})}
      >
        {!fullWidth ? (
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
