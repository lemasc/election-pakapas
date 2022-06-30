import { GetStaticPaths, GetStaticProps } from "next";
import { Sections, isSectionValid, sections } from "../../utils/metadata";
import { getPoliciesFromDir, getPolicy } from "../../utils/server";

export type PolicyList = {
  name: string;
  title: string;
};

type StaticParam = {
  section: Sections;
};

export type StaticData = {
  items: PolicyList[];
  section: Sections;
};

export const getStaticPaths: GetStaticPaths<StaticParam> = async () => {
  return {
    paths: [{ params: { section: "main" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<StaticData, StaticParam> = async ({
  params,
}) => {
  const { section } = params ?? {};
  if (section && isSectionValid(section)) {
    return {
      props: {
        items: await getPoliciesFromDir(section).then((files) =>
          Promise.all(
            files.map(async (name) => ({
              name: name as Sections,
              title: (await getPolicy(section, name)).metadata.title,
            }))
          )
        ),
        section,
      },
    };
  }
  return {
    redirect: "/survey",
  } as any;
};
