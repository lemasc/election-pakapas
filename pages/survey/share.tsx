import { GetServerSideProps } from "next";
import { Box, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { TokenData, sessionOptions } from "../../utils/survey";
import { unsealData } from "iron-session";
import Container from "../../components/layout/container";
import Link from "next/link";
import { pageDescription, sections } from "../../utils/metadata";
import Image from "next/image";
import surveyBox from "../../public/images/survey_box.jpg";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

const verifyProps = (props: Record<string, any>): props is TokenData => {
  return (
    props.name &&
    typeof props.name === "string" &&
    props.section &&
    Array.isArray(props.section)
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { token } = ctx.query ?? {};
    if (!token || typeof token !== "string")
      throw new Error("Invalid token param");

    const props = await unsealData(token, sessionOptions);
    if (!verifyProps(props)) throw new Error("Invalid props");
    const { name, section } = props;
    return {
      props: {
        name,
        section,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
      redirect: {
        destination: "/survey",
      },
    };
  }
};

export default function Share({ name, section }: TokenData) {
  const { pathname, query } = useRouter();
  const title = useMemo(() => `${name} ได้ทำแบบสอบถามของภคภ1สแล้ว`, [name]);
  return (
    <Container transparent>
      <Head>
        <title>{title}</title>
        <meta
          property="og:url"
          content={`https://pakapas.netlify.app?token=${query.token}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription["/survey"]} />
        <meta
          property="og:image"
          content={`https://pakapas.netlify.app/api/survey/og?token=${query.token}`}
        />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Box className="flex flex-col h-full min-h-screen w-full">
        <Box className="px-5 flex flex-1 items-center justify-center flex-col bg-gradient-to-b from-orange-300 to-orange-500 w-full">
          <Stack
            spacing="4"
            className="w-full max-w-lg text-center px-4 py-6 bg-white bg-opacity-75 flex flex-col items-center justify-center rounded-md"
          >
            <Heading>{name}</Heading>
            <Text fontWeight={"medium"}>
              ได้ทำแบบสอบถามเกี่ยวกับนโยบายของภคภ1สแล้ว
              <br />
              มาร่วมเป็นอีก 1 เสียงในการกำหนดทิศทางของโรงเรียนกันเถอะ
            </Text>
            <Stack flexDirection="row" gap="4">
              {section.map((section) => (
                <Image
                  key={section}
                  alt={sections[section]}
                  src={`/images/${
                    section === "main" ? "logo_circle" : section
                  }.png`}
                  width={50}
                  height={50}
                  draggable={false}
                  className="saturate-50"
                />
              ))}
            </Stack>
          </Stack>
        </Box>
        <Box
          p="6"
          className="bg-gray-50"
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          textAlign={"center"}
        >
          <Text color="orange.700" fontWeight={"medium"}>
            คุณก็สามารถร่วมเป็นส่วนหนึ่งของแบบสอบถามนี้ได้ ทำเลย!
          </Text>
        </Box>
      </Box>
      <Box
        as="section"
        display={"flex"}
        justifyContent="center"
        py={{ base: "4", md: "10", lg: "8" }}
        px={{ base: "8", md: "10", lg: "16" }}
      >
        <Box
          w="full"
          maxW="5xl"
          mx="4"
          flexDirection={{ base: "column-reverse", md: "row" }}
          gap={{ base: "2", lg: "8", xl: "12" }}
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack flexGrow={1} spacing={{ base: "4" }} maxW="md">
            <Heading size={"lg"}>แบบสอบถามของภคภ1ส</Heading>

            <Text>{pageDescription["/survey"]}</Text>

            <Text color="orange.600" fontWeight={"medium"}>
              เมื่อทำแบบสอบถามแล้ว สามารถแชร์ลงบนโซเชียลมีเดียได้
            </Text>

            <Box>
              <Link passHref href="/survey">
                <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                  ทำแบบสอบถามของภคภ1ส
                </Button>
              </Link>

              <Text fontSize="sm" py="4" color="orange.600">
                แบบสอบถามจะเปิดให้ทำได้ตั้งแต่วันที่ 1 ก.ค. เป็นต้นไป
              </Text>
            </Box>
          </Stack>

          <Box>
            <Image
              src={surveyBox}
              width={400}
              height={350}
              placeholder="blur"
              objectFit="cover"
              alt="แบบสอบถามของภคภ1ส"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
