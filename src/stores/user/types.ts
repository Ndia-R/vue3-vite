export type User = {
  user_id: string;
  username: string;
  access_token: string;
};

export type LoginDto = {
  username: string;
  password: string;
};
