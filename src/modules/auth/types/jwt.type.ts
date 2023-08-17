export type JwtPayload = {
  email: string;
  sub: string;
  role: string;
};

export type JwtTokens = {
  access_token: string;
  refresh_token: string;
};
