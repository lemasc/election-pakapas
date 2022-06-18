import Head from "next/head";
import { Heading, TextProps } from "@chakra-ui/react";

export default function Title({
  children,
  heading = true,
  subHeading,
  ...rest
}: {
  children: string;
  heading?: boolean;
  subHeading?: boolean;
} & Omit<TextProps, "children">) {
  return (
    <>
      <Head>
        <title>{children} - ภคภ1ส</title>
      </Head>
      {heading && (
        <Heading as="h1" size={subHeading ? "xl" : "2xl"} {...rest}>
          {children}
        </Heading>
      )}
    </>
  );
}
