import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogProps,
} from "@chakra-ui/react";
import React from "react";

export function LogoutModal({
  isOpen,
  onClose,
}: Pick<AlertDialogProps, "isOpen" | "onClose">) {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            คุณต้องการออกจากระบบหรือไม่
          </AlertDialogHeader>

          <AlertDialogBody>
            ข้อมูลการทำแบบสอบถามจะหายไป ต้องการดำเนินการต่อหรือไม่
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              คงอยู่ในระบบ
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              ออกจากระบบ
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
