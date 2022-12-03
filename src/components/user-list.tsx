import { Box, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  users: AdjustedUser[];
};

const UserList: FC<Props> = ({ users }) => {
  if (users.length === 0) {
    return <Text>誰もいません</Text>;
  }

  return (
    <VStack align="stretch">
      {users.map((user) => (
        <Box key={user.id}>
          <Text>@{user.id}</Text>
          <Text>{user.name}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default UserList;
