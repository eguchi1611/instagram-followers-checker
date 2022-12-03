import InputForm from "@/components/input-form";
import UserList from "@/components/user-list";
import { extract } from "@/utils/calc";
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  followersHtml: string;
  followingsHtml: string;
};

const IndexPage: NextPage = () => {
  // 入力フォーム
  const { register, handleSubmit } = useForm<Inputs>();

  const [users, setUsers] = useState<AdjustedUser[]>([]);

  const notFollowings = useMemo(
    () => users.filter((user) => !user.follower && user.following),
    [users]
  );

  const notFollowers = useMemo(
    () => users.filter((user) => user.follower && !user.following),
    [users]
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const res = extract(data.followersHtml, data.followingsHtml);
    setUsers(res);
    onOpen();
  };

  // 結果モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxWidth="3xl">
      <Head>
        <title>Instagram Followers Checker</title>
      </Head>
      <Text fontSize="x-large" mb={4}>
        Instagram Followers Checker
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <InputForm
            text="フォロワーのHTMLソース"
            inputProps={register("followersHtml")}
          />
          <InputForm
            text="フォロー中のHTMLソース"
            inputProps={register("followingsHtml")}
          />
          <Button variant="solid" type="submit">
            解析
          </Button>
        </VStack>
      </form>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>解析結果</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted>
              <TabList>
                <Tab>片思いしてる ({notFollowings.length})</Tab>
                <Tab>片思いされてる ({notFollowers.length})</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserList users={notFollowings} />
                </TabPanel>
                <TabPanel>
                  <UserList users={notFollowers} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default IndexPage;
