import {
  ContentMetadata,
  getPoliciesDirs,
  getPoliciesFromDir,
  getPolicy,
  PolicyData,
} from "../server";
import { GetStaticProps } from "next";
import { Sections } from "../metadata";

export type PolicyList = PolicyData & {
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
              const { metadata, content } = await getPolicy(
                folder,
                name,
                "partial"
              );
              return {
                metadata,
                content,
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
