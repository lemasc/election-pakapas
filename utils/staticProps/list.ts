import {
  ContentMetadata,
  getPoliciesDirs,
  getPoliciesFromDir,
  getPolicy,
} from "../server";
import { GetStaticProps } from "next";
import { Sections } from "../metadata";

export type PolicyList = {
  metadata: ContentMetadata;
  name: string;
};

export type StaticData = {
  items: [Sections, PolicyList[]][];
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const dirs = await getPoliciesDirs();
  const items = (await Promise.all(
    dirs.map(async (folder) => {
      const files = await getPoliciesFromDir(folder);
      const policies = (
        await Promise.all(
          files.map(async (name) => {
            try {
              const { metadata } = await getPolicy(folder, name);
              return {
                metadata,
                name,
              };
            } catch {
              return undefined;
            }
          })
        )
      ).filter(Boolean);
      return [folder, policies];
    })
  )) as StaticData["items"];

  return {
    props: {
      items,
    },
  };
};
