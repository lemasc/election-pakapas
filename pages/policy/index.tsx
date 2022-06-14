import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Checkbox,
  CheckboxGroup,
  ButtonGroup,
  Button,
  Tag,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import Container from "../../components/layout/container";
import NextLink from "next/link";

import {
  ContentMetadata,
  getPoliciesDirs,
  getPoliciesFromDir,
  getPolicy,
} from "../../utils/server";
import { useMemo, useState } from "react";
import { sections, Sections } from "../../utils/metadata";

type PolicyList = {
  metadata: ContentMetadata;
  name: string;
};

type StaticData = {
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

const PoliciesPage: NextPage<StaticData> = ({ items }) => {
  const [selected, setSelected] = useState<Sections | "all">("all");

  const targetDataset =
    selected === "all"
      ? items
      : ([items.find((v) => v[0] === selected)] as StaticData["items"]);

  return (
    <Container>
      <Heading as="h1" size="2xl">
        นโยบาย
      </Heading>
      <Stack>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          เลือกดูตามฝ่ายงาน
        </Text>
        <ButtonGroup spacing={"0"} colorScheme="orange">
          <Box gap={"2"} display={"flex"} flexWrap="wrap">
            {[["all", "นโยบายทั้งหมด"], ...Object.entries(sections)].map(
              ([name, section]) => (
                <Button
                  key={name}
                  variant={selected === name ? "solid" : "outline"}
                  onClick={() => setSelected(name as Sections)}
                >
                  {section}
                </Button>
              )
            )}
          </Box>
        </ButtonGroup>
      </Stack>
      <Box display="flex" gap="6" flexDirection={"row"} flexWrap="wrap">
        {targetDataset.map(([name, items], index) => {
          return items.map((item) => (
            <LinkBox
              my="0"
              as="article"
              w="full"
              maxW="sm"
              key={`${item.name}_${index}`}
              p="5"
              borderWidth="1px"
              rounded="md"
            >
              <Heading size="md" my="2">
                <NextLink href={`/policy/${name}/${item.name}`} passHref>
                  <LinkOverlay>{item.metadata.title}</LinkOverlay>
                </NextLink>
              </Heading>
              <Tag
                size="md"
                variant="outline"
                colorScheme="orange"
                fontWeight={"normal"}
              >
                {sections[name]}
              </Tag>
            </LinkBox>
          ));
        })}
      </Box>
    </Container>
  );
};

export default PoliciesPage;
