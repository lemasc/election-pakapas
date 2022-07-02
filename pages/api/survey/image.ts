import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../utils/firebase-admin";
import type { Sections } from "../../../utils/metadata";
import type { Metadata } from "../../../utils/userStore";
import { sealData } from "iron-session";
import { TokenData, sessionOptions, SnapshotData } from "../../../utils/survey";
import { nanoid } from "nanoid";
import { FieldValue } from "firebase-admin/firestore";

const auth = admin.auth();
const db = admin.firestore();

const getSurveyFromUser = async (uid: string) => {
  const userDoc = await db.collection("users").doc(uid).get();
  const data = userDoc.data() as Metadata | undefined;
  if (data && data.sections) {
    return data;
  }
  throw new Error("Doc not exists");
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const authorization = req.headers["authorization"];
  if (
    !authorization ||
    req.method !== "POST" ||
    typeof req.body.name !== "string"
  ) {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
  try {
    const user = await auth.verifyIdToken(authorization.split(" ")[1]);
    const metadata = await getSurveyFromUser(user.uid);
    if (!metadata.sections) {
      throw new Error("No sections available to generate.");
    }
    const tokenData: TokenData = {
      name: req.body.name,
      section: Object.keys(metadata.sections) as Sections[],
    };
    const token = await sealData(tokenData, sessionOptions);
    const snapshot = nanoid(25);
    const snapshotData: SnapshotData = {
      ...tokenData,
      uid: user.uid,
      token,
    };
    await db
      .collection("snapshots")
      .doc(snapshot)
      .set({ ...snapshotData, createdAt: FieldValue.serverTimestamp() });

    res.status(200).json({
      success: true,
      message: token,
      snapshot,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default handler;
