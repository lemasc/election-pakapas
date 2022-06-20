import {
  Box,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Container from "../components/layout/container";
import Title from "../components/Title";
export default function IndexPage() {
  const imageWidth = useBreakpointValue({ base: 400, md: 500, lg: 600 });
  const imageHeight = useBreakpointValue({ base: 0, lg: 800 });
  return (
    <Container>
      <Title>รู้จักกับภคภ1ส</Title>
      <Stack
        flexDirection={{ base: "column-reverse", lg: "row" }}
        gap={{ base: "4", sm: "8", xl: "10" }}
        alignItems={"center"}
      >
        <Box>
          <Image
            alt="About Image 1"
            src="/images/about_img1.jpg"
            width={imageWidth}
            height={imageHeight || imageWidth}
            objectFit="cover"
            objectPosition={"50% 10%"}
          />
        </Box>
        <Stack>
          <Heading as="h3" fontSize="3xl">
            ใครคือ ภคภ1ส ?
          </Heading>
          <Text py="2" className="form-container">
            <b>ชื่อ :</b>
            <span>นายภคภาส อัศวศิริวิลาศ (โอ๊ต)</span>
            <b>ชั้น :</b>
            <span>ม.4/2</span>
            <b>แผนการเรียน :</b>ภาษาอังกฤษ-คณิตศาสตร
            <b>อายุ :</b>
            <span>16 ปี</span>
            <b>เกิดวันที่ :</b>
            <span>10 มีนาคม พ.ศ. 2549</span>
            <b>หมู่เลือด:</b>
            <span> B </span>
            <b>ส่วนสูง :</b>
            <span>170 ซม. </span>
            <b>น้ำหนัก :</b>
            <span>60 กก.</span>
            <b>อาหารที่ชอบ :</b>
            <span>อิตาเลียน ญี่ปุ่น</span>
            <b>กีฬาที่ชอบ :</b>
            <span>ฟุตบอล</span>
            <b>สโมสรที่ชอบ :</b>
            <span>
              แมนเชสเตอร์ ยูไนเต็ด (เด็กหงส์ก็เลือกได้นะ อย่าเพิ่งหนีกันไปไหน
              😅)
            </span>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
