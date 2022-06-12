import Container from "../../components/layout/container";
import { Box, Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { contentDir, ContentMetadata, parseMetadata } from "../../utils/mdx";

type StaticParam = {
  name: string;
};

type StaticData = {
  content: MDXRemoteSerializeResult;
  metadata: ContentMetadata;
};

export const getStaticPaths: GetStaticPaths<StaticParam> = async () => {
  const files = await readdir(contentDir);
  return {
    paths: files.map((name) => ({
      params: { name: name.replace(".mdx", "") },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<StaticData, StaticParam> = async ({
  params,
}) => {
  const { name } = params ?? {};
  if (!name) {
    return {
      notFound: true,
    };
  }
  const source = await readFile(join(contentDir, `${name}.mdx`), {
    encoding: "utf-8",
  });
  const { compiledSource, frontmatter, scope } = await serialize(source, {
    parseFrontmatter: true,
  });
  return {
    props: {
      content: { compiledSource, scope },
      metadata: parseMetadata(frontmatter, name),
    },
  };
};

const ViewPolicyPage: NextPage<StaticData> = ({ content, metadata }) => {
  return (
    <Container>
      <Box>
        <Heading>{metadata.title}</Heading>
      </Box>
      <Box>
        <MDXRemote {...content} />
      </Box>
    </Container>
  );
};

export default ViewPolicyPage;
