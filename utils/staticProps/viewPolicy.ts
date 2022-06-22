import { getPoliciesFromDir, getPolicy, PolicyData } from "../server";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Sections } from "../metadata";

import { basename } from "path";

type StaticParam = {
  section: Sections;
  name: string;
};

export const getStaticPaths: GetStaticPaths<StaticParam> = async () => {
  const files = await getPoliciesFromDir("main");
  return {
    paths: files.map((name) => ({
      params: { name: basename(name), section: "main" },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PolicyData, StaticParam> = async ({
  params,
}) => {
  const { name, section } = params ?? {};
  if (!name || !section) {
    return {
      notFound: true,
    };
  }
  return {
    props: await getPolicy(section, name, true),
  };
};
