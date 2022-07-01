import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Container from "../components/layout/container";
import Title from "../components/Title";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";
import HeroImage from "../components/HeroImage";
import Link from "next/link";
import { pageDescription } from "../utils/metadata";
import Image from "next/image";
import surveyBox from "../public/images/survey_box.jpg";

function SectionBox({ children, ...rest }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      py="10"
      px={{ base: "8", md: "10", lg: "16" }}
      {...rest}
      display={"flex"}
      justifyContent="center"
    >
      <Stack spacing="4" w="full" maxW={{ base: "xl", lg: "lg" }}>
        {children}
      </Stack>
    </Box>
  );
}

export default function IndexPage() {
  return (
    <>
      <Container transparent>
        <Box mb="-2" w="full" minH="200px" bg="gray.100">
          <HeroImage />
        </Box>
        <Box as="section" className="grid md:grid-cols-2">
          <SectionBox bg="gray.100">
            <Heading size={"lg"}>เกี่ยวกับภคภ1ส</Heading>
            <Text>{pageDescription["/about"]}</Text>
            <Box>
              <Link href="/about" passHref>
                <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                  รู้จักกับภคภ1ส
                </Button>
              </Link>
            </Box>
          </SectionBox>
          <SectionBox bg="orange.200">
            <Heading size={"lg"}>นโยบายของภคภ1ส</Heading>
            <Text maxW="md">{pageDescription["/policy"]}</Text>
            <Box>
              <Link passHref href="/policy">
                <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                  อ่านนโยบายของภคภ1ส
                </Button>
              </Link>
            </Box>
          </SectionBox>
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
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme={"orange"}
                  >
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
      <Title heading={false}>หน้าหลัก</Title>
    </>
  );
}
