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
  Link as UILink,
  useToast,
  Collapse,
} from "@chakra-ui/react";

import { Sections, sections } from "../../utils/metadata";
import Container from "../../components/layout/container";
import Image from "next/image";

import Link from "next/link";
import Title from "../../components/Title";
import { AuthStatus } from "../../components/survey";
import { useAuth, useSurveyAnswered } from "../../utils/userStore";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { scrollToTarget } from "../../utils/scroll";
import axios from "axios";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  faFacebook,
  faLine,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Script from "next/script";
import { logEvent, withAnalytics } from "../../utils/analytics";
import InApp from "../../utils/inapp";

type ApiResult = {
  success: boolean;
  message: string;
  snapshot?: string;
};

type ShareParams = {
  quote: string;
  href: string;
  hashtag: string;
};

declare var FB: {
  ui: (
    props: { method: "share" } & ShareParams,
    callback: (err: any) => void
  ) => void;
};

const getShareParams = (name: string, result: ApiResult): ShareParams => {
  return {
    quote: `${name} ได้ทำแบบสอบถามของภคภ1ส คุณก็สามารถร่วมเป็นส่วนหนึ่งได้ ทำเลย!`,
    href: `${window.location.origin}/survey/share?token=${result.snapshot}`,
    hashtag: "#ภคภ1ส",
  };
};

const requestImage = (token: string) => {
  return fetch(`/api/survey/story?token=${token}`).then((res) => res.blob());
};

function SurveyShareImage({ onClose }: { onClose: () => void }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult>();
  const imageRef = useRef<HTMLImageElement | null>();
  const nameRef = useRef<string>(
    localStorage.getItem("survey-share-name") ??
      useAuth.getState().metadata?.name ??
      ""
  );

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
      setResult(data);
      const image = await requestImage(data.message);
      if (imageRef.current) {
        if (imageRef.current.src) {
          window.URL.revokeObjectURL(imageRef.current.src);
        }
        imageRef.current.src = window.URL.createObjectURL(image);
      }
      localStorage.setItem("survey-share-name", nameRef.current);
    } catch (err) {
      console.error(err);
    }
  };

  const share = useCallback(
    (method: "save" | "facebook" | "line" | "twitter" | "clipboard") => {
      if (!result) return;
      withAnalytics((a) => {
        logEvent(a, "share", {
          content_type: method === "save" ? "image" : "link",
          method,
          item_id: useAuth.getState().user?.uid,
        });
      });
      if (method === "save") {
        if (/Line|FBAN|FBAV\//gi.test(navigator.userAgent)) {
          // Use legacy downlaod header
          window.location.replace(
            "/api/survey/download?token=" + result.message
          );
          return;
        }
        if (imageRef.current?.src) {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.href = imageRef.current?.src;
          a.download = `survey-${nameRef.current}-${new Date().valueOf()}`;
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
          }, 0);
        }
        return;
      }

      const params = getShareParams(nameRef.current, result);

      if (method === "clipboard") {
        navigator.clipboard.writeText(params.href);
        toast({
          title: "คัดลอกลิงก์ไปยังคลิปบอร์ดแล้ว",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (method === "facebook") {
        FB.ui(
          {
            method: "share",
            ...params,
          },
          console.error
        );
        return;
      }

      let targetUrl: string;
      switch (method) {
        case "line":
          targetUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
            params.href
          )}`;
          break;
        case "twitter":
          const url = new URLSearchParams();
          url.append("text", params.quote);
          url.append("url", params.href);
          url.append("hashtags", params.hashtag.replace("#", ""));
          targetUrl = `https://twitter.com/share?${url.toString()}`;
      }
      if (targetUrl) {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }
    },
    [result, toast]
  );

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
            เมื่อทำแบบสอบถามของฝ่ายใดเสร็จ
            ตราประจำฝ่ายนั้นก็จะแสดงขึ้นมาในภาพที่แชร์
            มาเก็บให้ครบทุกฝ่ายกันเถอะ !
          </Text>
          <Stack spacing="4" py="2">
            <FormControl>
              <FormLabel htmlFor="name">
                ชื่อผู้ทำแบบสอบถาม (แสดงบนภาพ)
              </FormLabel>
              <Input
                isDisabled={loading}
                bg="white"
                defaultValue={nameRef.current}
                onChange={(e) => {
                  nameRef.current = e.target.value.trim();
                }}
                borderColor="gray.400"
                focusBorderColor="orange.400"
                placeholder="กรอกชื่อผู้ที่ต้องการให้แสดงบนภาพ"
              />
            </FormControl>

            <Button
              isDisabled={loading}
              onClick={submit}
              colorScheme={"orange"}
            >
              {loading ? "กำลังโหลด..." : "บันทึก"}
            </Button>
          </Stack>
          <Collapse in={!loading && !!result} animateOpacity>
            <Stack spacing="3">
              <Text fontWeight="medium">ตัวเลือกการแชร์</Text>
              <Button
                onClick={() => share("save")}
                bg="white"
                leftIcon={<DownloadIcon />}
                colorScheme="orange"
                variant="outline"
              >
                บันทึกลงในอุปกรณ์
              </Button>
              <Button
                onClick={() => share("clipboard")}
                bg="white"
                leftIcon={<CopyIcon />}
                colorScheme="blackAlpha"
                color="black"
                variant="outline"
              >
                คัดลอกลิงก์
              </Button>
              <Button
                w="full"
                onClick={() => share("twitter")}
                leftIcon={
                  <FontAwesomeIcon
                    size="lg"
                    className="-mt-0.5"
                    icon={faTwitter}
                  />
                }
                colorScheme="twitter"
              >
                แชร์ไปยัง Twitter
              </Button>
              <Button
                onClick={() => share("facebook")}
                leftIcon={
                  <FontAwesomeIcon
                    size="lg"
                    className="-mt-0.5"
                    icon={faFacebook}
                  />
                }
                colorScheme="facebook"
              >
                แชร์ไปยัง Facebook
              </Button>
              <Button
                onClick={() => share("line")}
                w="full"
                leftIcon={
                  <FontAwesomeIcon
                    size="lg"
                    className="-mt-0.5"
                    icon={faLine}
                  />
                }
                colorScheme="green"
              >
                แชร์ไปยัง LINE
              </Button>
            </Stack>
          </Collapse>
        </Stack>
        <Box>
          {result && (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img
              width={"960"}
              height={"1706"}
              ref={(ref) => (imageRef.current = ref)}
              onLoad={() => setLoading(false)}
              className={`rounded-md ${loading ? "bg-gray-100" : ""}`}
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
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        id="fbScript"
        async
        defer
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <Script />
      <Script id="fbInitScript" strategy="lazyOnload">
        {`window.fbAsyncInit = function() {
            FB.init({
              appId            : '776738080431714',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v14.0'
            });
          };`}
      </Script>

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
