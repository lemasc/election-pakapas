import Head from "next/head";
import { Heading, TextProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
  return (
    <>
      <Head>
        <title>{children} - ภคภ1ส</title>
        <meta
          property="og:url"
          content={`https://pakapas-staging.netlify.app${pathname}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${children} - ภคภ1ส`} />
        <meta
          property="og:description"
          content="ยินดีต้อนรับเข้าสู่เว็บไซต์ของนายภคภาส อัศวศิริวิลาศ ผู้สมัครประธานนักเรียนหมายเลข 1 ประจำปีการศึกษา 2565"
        />
        <meta
          property="og:image"
          content="https://pakapas-staging.netlify.app/_next/image?url=%2Fbackground%2Fhome.jpg&w=1920&q=75"
        />
        <meta property="og:image:alt" content="ภคภ1ส" />
      </Head>
      {heading && (
        <Heading as="h1" size={subHeading ? "xl" : "2xl"} {...rest}>
          {children}
        </Heading>
      )}
    </>
  );
}
