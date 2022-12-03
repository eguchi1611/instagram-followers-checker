import InputForm from "@/components/input-form";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  followersHtml: string;
  followingHtml: string;
};

const IndexPage: NextPage = () => {
  // 入力フォーム
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    onOpen();
  };

  // 結果モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <InputForm
            text="フォロワーのHTMLソース"
            inputProps={register("followersHtml")}
          />
          <InputForm
            text="フォロー中のHTMLソース"
            inputProps={register("followingHtml")}
          />
          <Button variant="solid" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>解析結果</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>text</Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default IndexPage;
