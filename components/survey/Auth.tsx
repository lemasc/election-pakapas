import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../utils/userStore";
import { LogoutModal } from "./Logout";
import { AuthProfile } from "./Profile";

export function AuthStatus() {
  const logoutModal = useDisclosure();
  const showProfile = useAuth((store) => store.showProfile);
  return (
    <>
      <LogoutModal isOpen={logoutModal.isOpen} onClose={logoutModal.onClose} />
      <AuthProfile
        isOpen={showProfile}
        onClose={() => useAuth.setState({ showProfile: false })}
      />
    </>
  );
}
