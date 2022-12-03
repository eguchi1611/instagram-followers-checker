type User = {
  id: string;
  name: string;
};

type AdjustedUser = User &
  Partial<{
    follower: boolean;
    following: boolean;
  }>;
