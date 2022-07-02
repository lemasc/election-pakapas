import { Sections } from "./metadata";
import { unsealData } from "iron-session";
import admin from "./firebase-admin";

export type TokenData = {
  name: string;
  section: Sections[];
};

export type SnapshotData = TokenData & {
  token: string;
  uid: string;
};

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  ttl: 0,
};

const isTokenSnapshot = (
  snapshot: Record<string, any>
): snapshot is SnapshotData => {
  return (
    snapshot.token &&
    typeof snapshot.token === "string" &&
    snapshot.uid &&
    typeof snapshot.uid === "string"
  );
};
const parseToken = async (token: string): Promise<TokenData> => {
  if (token.length === 25) {
    const snapshot = (
      await admin.firestore().collection("snapshots").doc(token).get()
    ).data();
    if (snapshot && isTokenSnapshot(snapshot)) {
      return {
        name: snapshot.name,
        section: snapshot.section,
      };
    }
  }
  return await unsealData<TokenData>(token, sessionOptions);
};

export const verifyAndUnseal = async (token: string) => {
  const data = await parseToken(token);
  if (typeof data.name === "string" && Array.isArray(data.section)) {
    return data;
  }
  throw new Error("Invalid token");
};
