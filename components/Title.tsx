import Head from "next/head";
import { Heading, TextProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getPageDescription } from "../utils/metadata";

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
  const { pathname } = useRouter();
  const description = useMemo(() => getPageDescription(pathname), [pathname]);
  return (
    <>
      <Head>
        <title>{children} - ภคภ1ส</title>
        <meta
          property="og:url"
          content={`https://pakapas.netlify.app${pathname}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${children} - ภคภ1ส`} />
        <meta
          property="og:description"
          key="description"
          content={description}
        />
        <meta
          property="og:image"
          key="image"
          content="https://pakapas.netlify.app/_next/image?url=%2Fbackground%2Fhome_og.jpg&w=1920&q=75"
        />
        <meta property="og:image:alt" content="ภคภ1ส" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1005" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {heading && (
        <Heading as="h1" size={subHeading ? "xl" : "2xl"} {...rest}>
          {children}
        </Heading>
      )}
    </>
  );
}
