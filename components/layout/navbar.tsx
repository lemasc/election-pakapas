import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useDisclosure,
  ChakraComponent,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ComponentProps } from "react";
import NextLink from "next/link";

export default function Navbar(props: ComponentProps<ChakraComponent<"nav">>) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    // @ts-expect-error Props HTMLElement
    <Box
      as="nav"
      position={"fixed"}
      top={0}
      insetX={0}
      shadow="md"
      width="full"
      zIndex={"sticky"}
      {...props}
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        backgroundColor="orange.400"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
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
              Logo
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
            color="white"
            _focus={{ color: "gray.600" }}
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
        <MobileNav />
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

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
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
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
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
    label: "ประวัติ",
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
