import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { readdir, readFile } from "fs/promises";
import { GetStaticProps, NextPage } from "next";
import { join } from "path";
import Container from "../../components/layout/container";

import { load } from "js-yaml";
import { ContentMetadata, parseMetadata } from "../../utils/mdx";

type PolicyList = Array<ContentMetadata & { name: string }>;

type StaticData = {
  items: PolicyList;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const contentDir = join(process.cwd(), "content");
  const files = await readdir(contentDir);
  const items = (
    await Promise.all(
      files.map(async (file) => {
        const filename = join(contentDir, file);
        const content = await readFile(filename, {
          encoding: "utf-8",
        });
        const match =
          /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(
            content
          );
        if (!match) return undefined;
        try {
          return parseMetadata(load(match[1], { filename }), file);
        } catch (err) {
          return undefined;
        }
      })
    )
  ).filter(Boolean) as PolicyList;
  return {
    props: {
      items,
    },
  };
};

const PoliciesPage: NextPage<StaticData> = ({ items }) => {
  return (
    <Container>
      <Heading as="h1">นโยบาย</Heading>
      <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
        <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
          13 days ago
        </Box>
        <Heading size="md" my="2">
          <LinkOverlay href="#">
            New Year, New Beginnings: Smashing Workshops & Audits
          </LinkOverlay>
        </Heading>
        <Text>
          Catch up on what’s been cookin’ at Smashing and explore some of the
          most popular community resources.
        </Text>
      </LinkBox>
    </Container>
  );
};

export default PoliciesPage;
