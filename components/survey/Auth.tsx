import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { LogoutModal } from "./Logout";
import { AuthProfile } from "./Profile";

export function AuthStatus() {
  const logoutModal = useDisclosure();
  const profileModal = useDisclosure();
  return (
    <>
      <LogoutModal isOpen={logoutModal.isOpen} onClose={logoutModal.onClose} />
      <AuthProfile
        isOpen={profileModal.isOpen}
        onClose={profileModal.onClose}
      />
      <Box
        display="flex"
        flexDirection="column"
        fontSize="sm"
        alignItems={{ base: "flex-start", md: "flex-end" }}
      >
        <Text fontWeight={"medium"}>คุณกำลังเข้าสู่ระบบในชื่อ</Text>
        <Text>
          <Button
            variant="unstyled"
            fontSize="sm"
            color="orange.500"
            onClick={profileModal.onOpen}
            textDecoration={"underline"}
            _hover={{ color: "orange.600" }}
          >
            แก้ไขข้อมูล
          </Button>{" "}
          หรือ{" "}
          <Button
            variant="unstyled"
            fontSize="sm"
            color="orange.500"
            onClick={logoutModal.onOpen}
            textDecoration={"underline"}
            _hover={{ color: "orange.600" }}
          >
            ออกจากระบบ
          </Button>
        </Text>
      </Box>
    </>
  );
}
