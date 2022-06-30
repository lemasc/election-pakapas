import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { auth, db } from "./firebase";
import { withAnalytics } from "./analytics";
import { setUserId } from "@firebase/analytics";
import {
  signInAnonymously,
  User,
  signOut as _signOut,
  onIdTokenChanged,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
  onSnapshot,
  doc,
  Unsubscribe,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Sections } from "./metadata";

export type Metadata = {
  name: string;
  role: "student" | "teacher" | "guest";
  sections: Record<string, number[]>;
};

export const roles: Record<Metadata["role"], string> = {
  student: "นักเรียน",
  teacher: "อาจารย์",
  guest: "บุคคลทั่วไป",
};

type AuthStore = {
  user: User | null | undefined;
  metadata: Metadata | null | undefined;
  setMetadata: (data: Omit<Metadata, "sections">) => Promise<void>;
  answerSurvey: (section: Sections, values: number[]) => Promise<void>;
  signOut: () => Promise<void>;
  showProfile: boolean;
};

export const useAuth = create(
  subscribeWithSelector<AuthStore>((set, get) => ({
    user: undefined,
    metadata: undefined,
    setMetadata: async (metadata) => {
      let user: AuthStore["user"] = get().user;
      const newUser = user === undefined;
      if (!user) {
        user = (await signInAnonymously(auth)).user;
      }
      return setDoc(
        doc(db, "users", user.uid),
        {
          ...metadata,
          updatedAt: serverTimestamp(),
          ...(newUser ? { createdAt: serverTimestamp() } : {}),
        },
        {
          merge: true,
        }
      );
    },
    answerSurvey: async (section, values) => {
      const snapshot = get();
      if (!snapshot.user || !snapshot.metadata) {
        throw new Error("Unauthorizard");
      }
      if (snapshot.metadata.sections?.[section]) {
        throw new Error("Already answered.");
      }
      return updateDoc(doc(db, "users", snapshot.user.uid), {
        [`sections.${section}`]: values,
        updatedAt: serverTimestamp(),
      });
    },
    signOut: () => _signOut(auth),
    showProfile: false,
  }))
);

export const useAuthInit = () => {
  const unsubscribe = useRef<Unsubscribe>();
  useEffect(
    () =>
      onIdTokenChanged(auth, async (curUser) => {
        if (curUser) {
          withAnalytics((a) => setUserId(a, curUser.uid));
          useAuth.setState({ user: curUser });
        } else {
          useAuth.setState({ user: null });
        }
      }),
    []
  );
  useEffect(
    () =>
      useAuth.subscribe(
        (state) => state.user,
        (user) => {
          if (unsubscribe.current) unsubscribe.current();
          if (user) {
            unsubscribe.current = onSnapshot(
              doc(db, "users", user.uid),
              (doc) => {
                useAuth.setState({
                  metadata: doc.exists() ? (doc.data() as Metadata) : null,
                });
              }
            );
          } else {
            useAuth.setState({
              metadata: null,
            });
          }
        }
      ),
    []
  );
};

export const useSurveyAnswered = (section: Sections) => {
  const [isAnswered, setIsAnswered] = useState(
    Array.isArray(useAuth.getState().metadata?.sections?.[section])
  );

  useEffect(
    () =>
      useAuth.subscribe(
        (state) => state.metadata?.sections?.[section],
        (v) => setIsAnswered(Array.isArray(v))
      ),
    [section]
  );
  return isAnswered;
};
