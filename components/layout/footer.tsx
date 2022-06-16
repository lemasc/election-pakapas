import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import IconButton, { Props } from "../IconButton";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

function ContactButton(props: Props) {
  return (
    <IconButton
      variant={"outline"}
      p="2"
      rounded="full"
      _hover={{ color: "black", background: "white" }}
      {...props}
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
          ผู้สมัครประธานนักเรียนหมายเลข 1 ประจำปีการศึกษา 2565
        </Text>
        <Stack my="2" justifyContent={"flex-start"} direction="row">
          <ContactButton label="ติดต่อทาง Facebook" icon={faFacebookF} />
          <ContactButton label="ติดต่อทาง Instagram" icon={faInstagram} />
        </Stack>
      </Box>
    </Box>
  );
}
