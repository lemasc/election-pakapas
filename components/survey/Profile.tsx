import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalProps,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { Metadata, roles, useAuth } from "../../utils/userStore";
import { useForm, Controller } from "react-hook-form";
export type AuthProfileProps = Pick<ModalProps, "isOpen" | "onClose">;

export function AuthProfile({ isOpen, onClose }: AuthProfileProps) {
  const metadata = useAuth((store) => store.metadata);
  const { control, handleSubmit } = useForm<Metadata>({
    defaultValues: {
      name: "",
    },
  });
  const setMetadata = (metadata: Metadata) => {
    useAuth.getState().setMetadata(metadata);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="2xl" mx="4">
        <ModalHeader>
          {metadata ? "แก้ไขข้อมูล" : "ลงทะเบียนข้อมูล"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            กรุณากรอกข้อมูลเล็กน้อยเพื่อให้เราสามารถนำข้อมูลจากแบบสำรวจนี้ไปใช้งานต่อได้
          </Text>
          <Stack py="4" spacing="4">
            <Controller
              name="name"
              rules={{
                required: "กรุณากรอกช่องนี้",
              }}
              control={control}
              render={({ field, fieldState: { error, isTouched } }) => (
                <FormControl isInvalid={error && isTouched}>
                  <FormLabel htmlFor="name">ชื่อผู้ทำแบบสอบถาม</FormLabel>
                  <Input
                    focusBorderColor="orange.400"
                    {...field}
                    placeholder="กรอกชื่อผู้ทำแบบสอบถาม"
                  />
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="role"
              rules={{
                required: "กรุณากรอกช่องนี้",
              }}
              control={control}
              render={({ field, fieldState: { error, isTouched } }) => (
                <FormControl isInvalid={error && isTouched}>
                  <FormLabel htmlFor="name">ประเภทผู้ทำแบบสอบถาม</FormLabel>
                  <RadioGroup {...field} colorScheme={"orange"}>
                    <Stack spacing={5} direction="row">
                      {Object.entries(roles).map(([eng, thai]) => (
                        <Radio key={eng} value={eng}>
                          {thai}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="orange"
            mr={3}
            onClick={handleSubmit(setMetadata)}
          >
            ดำเนินการต่อ
          </Button>
          <Button variant="ghost" onClick={onClose}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
