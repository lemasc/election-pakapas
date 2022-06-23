import {
  Box,
  Heading,
  Stack,
  Text,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Container from "../components/layout/container";
import Markdown from "../components/markdown";
import Title from "../components/Title";
import about_img1 from "../public/images/about_img1.jpg";
import about_img2 from "../public/images/about_img2.png";
import { FB_URL, IG_PERSONAL_URL } from "../utils/metadata";

export default function IndexPage() {
  const imageHeight = useBreakpointValue({ base: 1024, lg: 1536 });
  return (
    <Container transparent>
      <Box
        as="section"
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box
          flexShrink={0}
          className="w-full h-full lg:max-w-lg -mb-2 lg:mb-[unset]"
        >
          <Image
            priority
            alt="Home Background"
            src={about_img1}
            placeholder="blur"
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
            px={{ base: "8", md: "10", lg: "12" }}
            py={{ base: "10", md: "12", lg: "16" }}
            bg="orange.500"
            color="white"
          >
            รู้จักกับภคภ1ส
          </Title>
          <Stack
            px={{ base: "8", md: "10", lg: "12" }}
            py={{ base: "8", md: "10" }}
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
              <span>ม.5/2</span>
              <b>แผนการเรียน :</b>ภาษาอังกฤษ-คณิตศาสตร์
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
              <b>งานอดิเรก:</b>
              <span>ดูฟุตบอล ทำอาหาร ดูหนังและซีรีส์มาร์เวล</span>
              <b>Facebook:</b>
              <Link
                href={FB_URL}
                isExternal
                color="orange.500"
                _hover={{ color: "orange.600", textDecoration: "underline" }}
              >
                Pakapas Asavasirivilas
              </Link>
              <b>Instagram:</b>
              <Link
                href={IG_PERSONAL_URL}
                isExternal
                color="orange.500"
                _hover={{ color: "orange.600", textDecoration: "underline" }}
              >
                @pakapas_oat
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
      <Stack
        className="bg-gray-50"
        as="section"
        px={{ base: "8", md: "10", lg: "12" }}
        py={{ base: "6", md: "10" }}
        spacing="2"
      >
        <Heading className="text-orange-600" as="h3" size={"lg"}>
          ประวัติการศึกษา
        </Heading>
        <Box className="form-container form-container-sm">
          <span>ประถมศึกษา : โรงเรียนอรรถมิตร</span>
          <b>เกรดเฉลี่ย : 4.00</b>
          <span>
            มัธยมศึกษา : โรงเรียนมัธยมสาธิตวัดพระศรีมหาธาตุ
            มหาวิทยาลัยราชภัฏพระนคร
          </span>
          <b>เกรดเฉลี่ย : 4.00</b>
        </Box>
      </Stack>
      <Stack
        as="section"
        px={{ base: "8", md: "10", lg: "12" }}
        py={{ base: "6", md: "10" }}
        spacing="2"
      >
        <Heading className="text-orange-600" as="h3" size={"lg"}>
          ผลงาน
        </Heading>
        <Markdown>
          {`- หัวหน้าห้อง ม.1/2, 4/2, และ 5/2 
- ได้รับรางวัลผลการเรียนยอดเยี่ยม (คะแนนรวมสูงสุด) ชั้นม.3 และ ม.4/2 (แผนการเรียนภาษาอังกฤษ-คณิตศาสตร์)
- ชนะเลิศการประกวดเทพบุตร ระดับมัธยมศึกษาตอนต้น ประจำปี 2561, 2562, และ 2563 
- พิธีกรงานสายสัมพันธ์พ.ม. ปีการศึกษา 2561 และ 2563
- หัวหน้าฝ่ายบรรณาธิการ ชุมนุมสื่อสารมวลชน ปีการศึกษา 2564-ปัจจุบัน`}
        </Markdown>
      </Stack>
      <Box
        className="flex md:flex-row flex-col gap-8 items-center"
        px={{ base: "8", md: "10", lg: "12" }}
        py={{ base: "6", md: "10" }}
        bg="gray.50"
      >
        <Stack as="section" spacing="2" className="flex-grow">
          <Heading className="text-orange-600" as="h3" size={"lg"}>
            ทำไมถึงลงสมัครรับเลือกตั้ง ?
          </Heading>
          <Text className="content py-2">
            &quot;จริง ๆ มีหลายเหตุผลนะครับ
            แต่สิ่งที่สำคัญที่สุดคือผมมีความฝันครับ ฝันอยากเห็นโรงเรียนพัฒนาขึ้น
            อยากเห็นนักเรียนได้มีส่วนร่วมในการขับเคลื่อนโรงเรียนให้ก้าวไปข้างหน้า
            สรุปง่าย ๆ ก็คืออยากเห็นโรงเรียนดีขึ้นนั่นแหละ
            แต่ไม่ได้จะบอกว่าปัจจุบันมันไม่ดีนะ คือก็ดีแหละ
            แต่ส่วนตัวเชื่อว่าโรงเรียนเรามีศักยภาพที่สูงมาก
            มันสามารถดีได้กว่านี้ไม่น้อยเลย เพราะฉะนั้น
            เมื่อมีโอกาสให้เราได้ลงเลือกตั้ง
            ก็เลยตัดสินใจจะทำฝันนั้นให้เป็นจริงครับ
            และผมก็เชื่อนะครับว่ามีหลายคนแน่นอนที่อาจจะฝันเหมือนกับผมหรือคล้ายกับผม
            เรามาร่วมสร้างฝันนั้นให้เป็นจริงกันครับ
            ไม่ว่าเส้นทางข้างหน้าจะยากลำบากสักแค่ไหน
            ถ้าเราร่วมแรงร่วมใจเดินไปด้วยกัน ยังไงสักวันเราก็ต้องไปถึงครับ&quot;
          </Text>
        </Stack>
        <Box flexShrink={0} className="max-w-xs">
          <Image
            priority
            alt="Home Background"
            src={about_img2}
            placeholder="blur"
            objectFit="cover"
            width={500}
            height={500}
          />
        </Box>
      </Box>
    </Container>
  );
}
