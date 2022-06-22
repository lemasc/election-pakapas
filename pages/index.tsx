import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Container from "../components/layout/container";
import Title from "../components/Title";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";
import HeroImage from "../components/HeroImage";

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
        <Box mb="-2" w="full" minH="200px" bg="gray.100">
          <HeroImage />
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
            <Text maxW="md">
              นโยบายของเรามุ่งเน้นการมีส่วนร่วมของนักเรียนเป็นสำคัญ
              มาช่วยกันพัฒนาโรงเรียนของเรากันเถอะ !
            </Text>
            <Box>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                อ่านนโยบายของภคภ1ส
              </Button>
            </Box>
          </SectionBox>
        </Box>
        <Box
          as="section"
          display={"flex"}
          flexDirection={{ base: "row" }}
          justifyContent="center"
          py="10"
          px={{ base: "8", md: "10", lg: "16" }}
        >
          <Box w="full" maxW="4xl" mx="4" className="grid md:grid-cols-2 gap-8">
            <Stack spacing="4">
              <Heading size={"lg"}>แบบสอบถามของภคภ1ส</Heading>
              <Text>
                เสียงของทุกคนมีค่า มาแสดงความคิดเห็นต่อนโยบายของภคภ1ส
                เพื่อร่วมกำหนดทิศทางของโรงเรียนไปด้วยกัน
              </Text>
              <Box>
                <Button rightIcon={<ArrowForwardIcon />} colorScheme={"orange"}>
                  ทำแบบสอบถามของภคภ1ส
                </Button>
              </Box>
            </Stack>
            <Stack
              spacing="4"
              className="border border-black w-50 h-50"
            ></Stack>
          </Box>
        </Box>
      </Container>
      <Title heading={false}>หน้าหลัก</Title>
    </>
  );
}
