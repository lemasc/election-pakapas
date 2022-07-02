import { Sections } from "./metadata";

export type TokenData = {
  name: string;
  section: Sections[];
};

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  ttl: 0,
};
