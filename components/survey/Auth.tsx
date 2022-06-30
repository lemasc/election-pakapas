import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../utils/userStore";
import { LogoutModal } from "./Logout";
import { AuthProfile } from "./Profile";

export function AuthStatus() {
  const logoutModal = useDisclosure();
  const showProfile = useAuth((store) => store.showProfile);
  const metadata = useAuth((store) => store.metadata);
  return (
    <>
      <LogoutModal isOpen={logoutModal.isOpen} onClose={logoutModal.onClose} />
      <AuthProfile
        isOpen={showProfile}
        onClose={() => useAuth.setState({ showProfile: false })}
      />
      {metadata && (
        <Box
          display="flex"
          flexDirection="column"
          fontSize="sm"
          textAlign={"right"}
          alignSelf={"flex-end"}
          alignItems={"flex-end"}
        >
          <Text fontWeight={"medium"}>
            คุณกำลังเข้าสู่ระบบในชื่อ {metadata.name}
          </Text>
          <Text>
            <Button
              variant="unstyled"
              fontSize="sm"
              color="orange.500"
              onClick={() => useAuth.setState({ showProfile: true })}
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
      )}
    </>
  );
}
