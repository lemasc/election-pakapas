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
import { DownloadIcon } from "@chakra-ui/icons";
import {
  faFacebook,
  faLine,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Script from "next/script";

type ApiResult = {
  success: boolean;
  message: string;
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

const getShareParams = (name: string, token: string): ShareParams => {
  return {
    quote: `${name} ได้ทำแบบสอบถามของภคภ1ส คุณก็สามารถร่วมเป็นส่วนหนึ่งได้ ทำเลย!`,
    //href: `${window.location.origin}/survey/share?token=${token}`,
    href: "https://pakapas.netlify.app",
    hashtag: "#ภคภ1ส",
  };
};

const requestImage = (token: string) => {
  return fetch(`/api/survey/story?token=${token}`).then((res) => res.blob());
};

function SurveyShareImage({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>();
  const imageRef = useRef<HTMLImageElement | null>();
  const nameRef = useRef<string>(
    localStorage.getItem("survey-share-name") ??
      useAuth.getState().metadata?.name ??
      ""
  );

  useEffect(() => {
    (async () => {
      if (!token || !imageRef.current) return;
      const image = await requestImage(token);
      if (imageRef.current.src) {
        window.URL.revokeObjectURL(imageRef.current.src);
      }
      imageRef.current.src = window.URL.createObjectURL(image);
    })();
  }, [token]);

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
      localStorage.setItem("survey-share-name", nameRef.current);
      setToken(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadImage = useCallback(() => {
    console.log(imageRef.current?.src);
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
  }, []);

  const lineLink = useMemo(() => {
    if (!token) return;
    const params = getShareParams(nameRef.current, token);
    return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      params.href
    )}`;
  }, [token]);

  const twitterLink = useMemo(() => {
    if (!token) return;
    const params = getShareParams(nameRef.current, token);
    const url = new URLSearchParams();
    url.append("text", params.quote);
    url.append("url", params.href);
    url.append("hashtags", params.hashtag.replace("#", ""));
    return `https://twitter.com/share?${url.toString()}`;
  }, [token]);

  const openFacebookShare = useCallback(() => {
    if (!token) return;
    FB.ui(
      {
        method: "share",
        ...getShareParams(nameRef.current, token),
      },
      console.error
    );
  }, [token]);

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
              {loading ? "กำลังโหลด" : "บันทึก"}
            </Button>
          </Stack>
          {!loading && token && (
            <Stack spacing="3">
              <Text fontWeight="medium">ตัวเลือกการแชร์</Text>
              <Button
                onClick={() => downloadImage()}
                bg="white"
                leftIcon={<DownloadIcon />}
                colorScheme="orange"
                variant="outline"
              >
                บันทึกลงในอุปกรณ์
              </Button>
              <a href={twitterLink} target="_blank" rel="noreferrer noopener">
                <Button
                  w="full"
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
              </a>
              <Button
                onClick={openFacebookShare}
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
              <a href={lineLink} target="_blank" rel="noreferrer noopener">
                <Button
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
              </a>
            </Stack>
          )}
        </Stack>
        <Box>
          {token && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="Image"
              width={"960"}
              height={"1706"}
              ref={(ref) => (imageRef.current = ref)}
              onLoad={() => setLoading(false)}
              className={`rounded-md ${loading ? "bg-gray-100" : ""}`}
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
