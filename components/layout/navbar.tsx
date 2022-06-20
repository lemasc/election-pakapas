import {
  Box,
  ChakraComponent,
  Collapse,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ComponentProps, useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import DynamicImage from "../DynamicImage";

function Logo({
  hidden,
  light = true,
  ...props
}: {
  light?: boolean;
  hidden?: boolean;
}) {
  if (typeof hidden !== "undefined") {
    // Applying display styles directly doesn't work, because NextJS add inline styles over it.
    return (
      <Box display={hidden ? "none" : undefined}>
        <Logo light={light} />
      </Box>
    );
  }
  return (
    <Image
      alt="ภคภ1ส"
      src={`/images/logo${light ? "_light" : ""}.png`}
      width={60}
      height={60}
      {...props}
    />
  );
}

export default function Navbar({
  transparent,
  ...props
}: ComponentProps<ChakraComponent<"nav">> & {
  transparent?: boolean;
}) {
  const { isOpen, onToggle } = useDisclosure();

  const [top, setTop] = useState(true);
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 100 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const { pathname } = useRouter();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    // @ts-expect-error Props HTMLElement
    <Box
      as="nav"
      position={"fixed"}
      top={0}
      insetX={0}
      shadow={transparent && top ? undefined : "md"}
      width="full"
      zIndex={"sticky"}
      {...props}
    >
      <Flex
        className={`transition duration-300 ease-in-out ${
          transparent && top
            ? `${isOpen ? "bg-white bg-opacity-80" : "bg-transparent"}`
            : ""
        }`}
        backgroundColor={transparent && top ? undefined : "orange.400"}
        color={useColorModeValue("gray.600", "white")}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"} align="center">
          <NextLink href="/" passHref>
            <Text
              as={"a"}
              title="หน้าหลัก"
              textAlign={"left"}
              fontFamily={"heading"}
              fontWeight="bold"
              fontSize={"lg"}
              color={useColorModeValue("white", "gray.800")}
            >
              {pathname === "/" ? (
                <>
                  {/* Prefetch images ! */}
                  <DynamicImage
                    alt="ภคภ1ส"
                    src={["/images/logo.png", "/images/logo_light.png"]}
                    width={60}
                    height={60}
                    index={top && !isMobile ? 0 : 1}
                  />
                </>
              ) : (
                <Logo />
              )}
            </Text>
          </NextLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex
          flex={{ base: 1, md: "0" }}
          display={{ base: "flex", md: "none" }}
          justify="flex-end"
        >
          <IconButton
            color={isOpen && transparent && top ? "gray.600" : "white"}
            _hover={
              transparent && top && !isOpen ? { color: "gray.100" } : undefined
            }
            _focus={{}}
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav transparent={transparent && top} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkHoverColor = useColorModeValue("gray.200", "gray.600");
  const linkColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href ?? "#"} passHref>
            <Link
              p={2}
              fontWeight="medium"
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ transparent }: { transparent?: boolean }) => {
  return (
    <Stack
      className={`transition duration-300 ease-in-out ${
        transparent ? "bg-opacity-90 " : ""
      } bg-white`}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <NextLink href={href ?? "#"} passHref>
        <Flex
          py={2}
          as={Link}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Flex>
      </NextLink>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "เกี่ยวกับ",
    href: "/about",
  },
  {
    label: "นโยบาย",
    href: "/policy",
  },
  {
    label: "แบบสอบถาม",
    href: "/survey",
  },
];
