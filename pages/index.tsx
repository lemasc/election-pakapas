import { Box } from "@chakra-ui/react";
import Container from "../components/layout/container";
import Title from "../components/Title";
import Image from "next/image";
export default function IndexPage() {
  return (
    <Container transparent>
      <Box>
        <Image
          alt="Home Background"
          src="/background/home.jpg"
          width="1920"
          height="1080"
          objectFit="contain"
          objectPosition={"top"}
        />
      </Box>
      <Title heading={false}>หน้าหลัก</Title>
    </Container>
  );
}
