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
  const imageHeight = useBreakpointValue({ base: 1024, lg: 1536 });
  return (
    <Container transparent>
      <Box display="flex" flexDirection={{ base: "column", lg: "row" }}>
        <Box
          flexShrink={0}
          className="w-full h-full lg:max-w-lg -mb-2 lg:mb-[unset]"
        >
          <Image
            priority
            alt="Home Background"
            src="/images/about_img1.jpg"
            layout="responsive"
            objectFit="cover"
            width={1024}
            height={imageHeight}
            className={"object-[50%_10%] lg:object-[unset]"}
          />
        </Box>
        <Box
          flex={1}
          flexGrow={1}
          h="full"
          w="full"
          display="flex"
          flexDirection={"column"}
        >
          <Title
            px="12"
            py={{ base: "12", lg: "16" }}
            bg="orange.500"
            color="white"
          >
            รู้จักกับภคภ1ส
          </Title>
          <Stack
            px="12"
            py="10"
            flex={1}
            flexGrow={1}
            spacing="6"
            h="full"
            justifyContent="center"
          >
            <Text className="form-container">
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
              <b>Facebook:</b>
              <span>Pakapas Asavasirivilas</span>
              <b>Instagram:</b>
              <span>@pakapas_oat</span>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
