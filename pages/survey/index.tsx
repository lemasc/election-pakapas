import {
  Button,
  ButtonProps,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Sections, sections } from "../../utils/metadata";
import Container from "../../components/layout/container";
import Image from "next/image";

import Link from "next/link";
import Title from "../../components/Title";

function SectionButton({ section, ...rest }: { section: Sections }) {
  const title = sections[section];
  const imageSize = useBreakpointValue({ base: 70, md: 100 });
  const cardHeight = useBreakpointValue({ base: 150, md: 180 });
  return (
    <Link href={`/survey/${section}`} passHref>
      <Button
        variant="outline"
        colorScheme={"orange"}
        borderWidth={1.5}
        _hover={{ backgroundColor: "orange.500", color: "white" }}
        _active={{
          backgroundColor: "orange.400",
          color: "white",
        }}
        width={"full"}
        height={cardHeight}
        gap="4"
        flexDirection="column"
        {...rest}
      >
        <Image
          title={title}
          alt={title}
          src={`/images/${section === "main" ? "logo_circle" : section}.png`}
          width={imageSize}
          height={imageSize}
        />
        <Heading wordBreak={"break-all"} noOfLines={2} fontSize={"xl"}>
          {title}
        </Heading>
      </Button>
    </Link>
  );
}

export default function Survey() {
  return (
    <Container>
      <Title>แบบสอบถาม</Title>
      <Text maxWidth="650px">
        ทุกความคิดเห็นในแบบสอบถามนี้ เราจะนำไปประเมินนโยบายทั้งหมด
        กรุณาสละเวลาเพียงครู่เดียว
        เพื่อร่วมกำหนดทิศทางที่โรงเรียนของเราจะก้าวเดินไปกันเถอะ
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {Object.keys(sections).map((section) => (
          <SectionButton key={section} section={section as Sections} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
