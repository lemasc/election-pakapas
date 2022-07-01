import {
  Box,
  Button,
  CloseButton,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { Sections, sections } from "../../utils/metadata";
import Container from "../../components/layout/container";
import Image from "next/image";

import Link from "next/link";
import Title from "../../components/Title";
import { AuthStatus } from "../../components/survey";
import { useAuth, useSurveyAnswered } from "../../utils/userStore";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { scrollToTarget } from "../../utils/scroll";
import axios from "axios";

type ApiResult = {
  success: boolean;
  message: string;
};

function SurveyShareImage({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>();
  const nameRef = useRef<string>("");
  const submit = async () => {
    const user = useAuth.getState().user;
    if (nameRef.current === "" || !user) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post<ApiResult>(
        "/api/survey/image",
        {
          name: nameRef.current,
        },
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );
      setToken(data.message);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box mt="4" border="2px" borderColor="orange.500" rounded="lg">
      <Box
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        bg="orange.500"
        roundedTop="md"
        px="5"
        py="4"
      >
        <Heading
          flexGrow={1}
          fontWeight={"medium"}
          color="white"
          as="h3"
          fontSize="xl"
        >
          แชร์ไปยัง Social Media
        </Heading>
        <CloseButton
          onClick={() => {
            onClose();
          }}
          color="white"
        />
      </Box>
      <Box
        className="flex flex-col md:grid grid-cols-2 gap-6 md:gap-10"
        roundedBottom="md"
        p="5"
        bg="gray.50"
      >
        <Stack spacing="3">
          <Text>
            เชิญชวนชาวพอมอทุกคนมาร่วมเป็นหนึ่งเสียงในการขับเคลื่อนโรงเรียนของเรา{" "}
            <b>เพื่อโรงเรียนที่นักเรียนมีส่วนร่วม</b>
          </Text>
          <Text color="orange.500" fontWeight={"bold"}>
            เมื่อทำแบบสอบถามของฝ่ายใดเสร็จ ตราประจำฝ่ายนั้นก็จะแสดงขึ้นมาในภาพ
            มาเก็บให้ครบทุกฝ่ายกันเถอะ !
          </Text>
          <Stack spacing="4" py="2">
            <FormControl>
              <FormLabel htmlFor="name">ชื่อผู้ทำแบบสอบถาม</FormLabel>
              <Input
                isDisabled={loading}
                bg="white"
                onChange={(e) => {
                  nameRef.current = e.target.value.trim();
                }}
                borderColor="gray.400"
                focusBorderColor="orange.400"
                placeholder="กรอกชื่อผู้ทำแบบสอบถาม"
              />
            </FormControl>

            <Button
              isDisabled={loading}
              onClick={submit}
              colorScheme={"orange"}
            >
              บันทึก
            </Button>
          </Stack>
        </Stack>
        <Box>
          {token && (
            <Image
              alt="Image"
              width={960}
              height={1706}
              onLoadingComplete={() => setLoading(false)}
              className="rounded-md"
              src={`/api/survey/story?token=${token}`}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

function SectionButton({ section, ...rest }: { section: Sections }) {
  const title = sections[section];
  const imageSize = useBreakpointValue({ base: 70, md: 100 });
  const cardHeight = useBreakpointValue({ base: 150, md: 180 });
  const isAnswered = useSurveyAnswered(section);
  return (
    <Link href={`/survey/${section}`} passHref>
      <Button
        variant="outline"
        colorScheme={"orange"}
        borderWidth={1.5}
        _hover={
          isAnswered
            ? undefined
            : { backgroundColor: "orange.500", color: "white" }
        }
        _active={
          isAnswered
            ? undefined
            : {
                backgroundColor: "orange.400",
                color: "white",
              }
        }
        width={"full"}
        disabled={isAnswered}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const answeredSections = useAuth((store) => store.metadata?.sections);
  const isMd = useBreakpointValue({ base: false, md: true });
  const toggleBoxRef = useRef<HTMLDivElement | null>();
  return (
    <Container>
      <Stack spacing="4" direction={{ base: "column", md: "row" }}>
        <Title flexGrow={1}>แบบสอบถาม</Title>
        <AuthStatus />
      </Stack>
      <Stack
        gap={{ base: undefined, sm: "6", md: "8" }}
        alignItems="center"
        direction={{ base: "column", sm: "row" }}
      >
        <Box flexGrow={1}>
          <Text style={{ marginTop: "0px" }} maxWidth="650px">
            ทุกความคิดเห็นในแบบสอบถามนี้ เราจะนำไปประเมินนโยบายทั้งหมด
            กรุณาสละเวลาเพียงครู่เดียว
            เพื่อร่วมกำหนดทิศทางที่โรงเรียนของเราจะก้าวเดินไปกันเถอะ
          </Text>
        </Box>
        {answeredSections && (
          <Box
            w={{ base: "full", sm: "unset" }}
            justifySelf={{ base: undefined, lg: "flex-end" }}
          >
            <Button
              onClick={() => {
                onOpen();
                scrollToTarget(toggleBoxRef.current);
              }}
              minW="150px"
              w={{ base: "full", sm: "unset" }}
              leftIcon={
                <Icon
                  as={() => <FontAwesomeIcon icon={faArrowUpFromBracket} />}
                />
              }
              colorScheme={"orange"}
            >
              แชร์
            </Button>
          </Box>
        )}
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {Object.keys(sections).map((section) => (
          <SectionButton key={section} section={section as Sections} />
        ))}
      </SimpleGrid>

      {answeredSections && (
        <Box ref={(ref) => (toggleBoxRef.current = ref)}>
          {isOpen && <SurveyShareImage onClose={onClose} />}
        </Box>
      )}
    </Container>
  );
}
