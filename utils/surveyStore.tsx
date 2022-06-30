import React from "react";
import { StoreApi } from "zustand";
import createContext from "zustand/context";
import { Sections } from "./metadata";

import create from "zustand";
import { StaticData } from "./staticProps/viewSurvey";

export type SurveyContext = {
  section: Sections;
  hasError: boolean;
  submitting: boolean;
  selected: (number | undefined)[];
  setHasError: (hasError: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
};

const {
  Provider: StoreProvider,
  useStore,
  useStoreApi,
} = createContext<StoreApi<SurveyContext>>();

const withSurveyStore = (Children: React.FC<StaticData>) =>
  function SurveySectionProvider({ section, items }: StaticData) {
    return (
      <StoreProvider
        createStore={() =>
          create((set) => ({
            section,
            hasError: false,
            submitting: false,
            selected: Array(items.length).fill(undefined),
            setHasError: (hasError) => set({ hasError }),
            setSubmitting: (submitting) => set({ submitting }),
          }))
        }
      >
        <Children items={items} section={section} />
      </StoreProvider>
    );
  };

export { withSurveyStore, useStore, useStoreApi };
