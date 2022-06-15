import {
  Box,
  Heading,
  Icon,
  IconButton,
  IconProps,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  IconDefinition,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function ContactButton({
  label,
  icon,
  ...rest
}: {
  label: string;
  icon: IconDefinition;
} & IconProps) {
  return (
    <IconButton
      title={label}
      aria-label={label}
      variant={"outline"}
      p="2"
      rounded="full"
      _hover={{ color: "black", background: "white" }}
      icon={<Icon as={() => <FontAwesomeIcon icon={icon} />} {...rest} />}
    />
  );
}
export default function Footer() {
  return (
    <Box
      as="footer"
      backgroundColor="black"
      color="white"
      width="full"
      px={{ base: "8", lg: "16" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      gap="2"
      alignItems={{ base: "flex-start", sm: "center" }}
      py="6"
    >
      <Image
        alt="ภคภ1ส"
        src="/images/logo_light.png"
        width={120}
        height={120}
      />
      <Box>
        <Heading as="span" fontSize={"lg"}>
          ภคภาส อัศวศิริวิลาศ
        </Heading>
        <Text my="1" fontSize="xs">
          ผู้สมัครประธานนักเรียนประจำปีการศึกษา 2565 หมายเลข 1
        </Text>
        <Stack my="2" justifyContent={"flex-start"} direction="row">
          <ContactButton
            label="ติดต่อทาง Facebook"
            icon={faFacebookF}
            w={5}
            h={5}
          />
          <ContactButton
            label="ติดต่อทาง Instagram"
            icon={faInstagram}
            w={5}
            h={5}
          />
        </Stack>
      </Box>
    </Box>
  );
}
