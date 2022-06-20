import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Container from "../components/layout/container";
import Title from "../components/Title";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";
import DynamicImage from "../components/DynamicImage";

function SectionBox({ children, ...rest }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      py="10"
      px={{ base: "8", md: "10", lg: "16" }}
      {...rest}
      display={"flex"}
      justifyContent="center"
    >
      <Stack spacing="4" w="full" maxW="lg">
        {children}
      </Stack>
    </Box>
  );
}

export default function IndexPage() {
  return (
    <>
      <Container transparent>
        <Box mb="-2" w="full">
          <DynamicImage
            priority
            alt="Home Background"
            index={useBreakpointValue({ base: 1, sm: 0 }) as number}
            src={["/background/home.jpg", "/background/home_mobile.jpg"]}
            width={["1920", "1080"]}
            height={["1080", "1920"]}
          />
        </Box>
        <Box as="section" className="grid md:grid-cols-2">
          <SectionBox bg="gray.100">
            <Heading size={"lg"}>เกี่ยวกับภคภ1ส</Heading>
            <Text>ทุกเรื่องราวของภคภ1ส มีคำตอบอยู่ที่นี่</Text>
            <Box>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                รู้จักกับภคภ1ส
              </Button>
            </Box>
          </SectionBox>
          <SectionBox bg="orange.200">
            <Heading size={"lg"}>นโยบายของภคภ1ส</Heading>
            <Text>นโยบายของเรามุ่งเน้นการพัฒนาโรงเรียนเป็นสำคัญ เพื่อให้</Text>
            <Box>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                อ่านนโยบายของภคภ1ส
              </Button>
            </Box>
          </SectionBox>
        </Box>
        <Box as="section" className="grid md:grid-cols-2">
          <Stack
            spacing="4"
            py="10"
            mx={"4"}
            px={{ base: "8", md: "10", lg: "16" }}
          >
            <Heading size={"lg"}>แบบสอบถามของภคภ1ส</Heading>
            <Text>มาร่วมกำหนดทิศทางของโรงเรียนไปด้วยกัน</Text>
            <Box>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                ทำแบบสอบถามของภคภ1ส
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Title heading={false}>หน้าหลัก</Title>
    </>
  );
}
