import Head from "next/head";
import { Heading } from "@chakra-ui/react";

export default function Title({
  children,
  heading = true,
}: {
  children: string;
  heading?: boolean;
}) {
  return (
    <>
      <Head>
        <title>{children} - ภคภ1ส</title>
      </Head>
      {heading && (
        <Heading as="h1" size="2xl">
          {children}
        </Heading>
      )}
    </>
  );
}
