import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Modal as UIModal,
} from "@chakra-ui/react";

type Props = Pick<ModalProps, "isOpen" | "onClose">;

export default function Modal({ isOpen, onClose }: Props) {
  return (
    <UIModal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent mx="8">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
          deserunt aute id consequat veniam incididunt duis in sint irure nisi.
          Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor
          esse quis. Sunt ad dolore quis aute consequat. Magna exercitation
          reprehenderit magna aute tempor cupidatat consequat elit dolor
          adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
          Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
          eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
          pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </UIModal>
  );
}
