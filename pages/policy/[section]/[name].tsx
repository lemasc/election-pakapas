import Container from "../../../components/layout/container";
import { Box, Heading, Icon, Stack } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { basename } from "path";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  ContentMetadata,
  getPoliciesFromDir,
  getPolicy,
} from "../../../utils/server";
import { Sections } from "../../../utils/metadata";
import Link from "../../../components/Link";
import { ArrowBackIcon, ChevronLeftIcon } from "@chakra-ui/icons";

type StaticParam = {
  section: Sections;
  name: string;
};

type StaticData = {
  content: MDXRemoteSerializeResult;
  metadata: ContentMetadata;
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

export const getStaticProps: GetStaticProps<StaticData, StaticParam> = async ({
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

const ViewPolicyPage: NextPage<StaticData> = ({ content, metadata }) => {
  return (
    <Container>
      <Stack gap="1.5">
        <Link
          href="/policy"
          fontSize="sm"
          color={"orange.500"}
          _hover={{ color: "orange.600", textDecoration: "underline" }}
          title="กลับไปยังหน้ารวมนโยบาย"
        >
          <ChevronLeftIcon w="5" h="5" mt="-0.5" />
          กลับไปยังหน้ารวมนโยบาย
        </Link>
        <Heading>{metadata.title}</Heading>
      </Stack>
      <Box className="content">
        <MDXRemote {...content} />
      </Box>
    </Container>
  );
};

export default ViewPolicyPage;
