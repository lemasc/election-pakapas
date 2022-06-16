import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  LinkBox,
  LinkOverlay,
  Select,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

import { GetStaticProps, NextPage } from "next";
import { Sections, isSectionValid, sections } from "../../utils/metadata";
import { useEffect, useMemo, useState } from "react";
import Container from "../../components/layout/container";
import NextLink from "next/link";
import { StaticData } from "../../utils/staticProps/list";

import Title from "../../components/Title";
import { useRouter } from "next/router";

export { getStaticProps } from "../../utils/staticProps/list";

const sectionsToSelect = [
  ["all", "นโยบายทั้งหมด"],
  ...Object.entries(sections),
] as [Sections | "all", string][];

const PoliciesPage: NextPage<StaticData> = ({ items }) => {
  const { query, replace, push } = useRouter();
  const selected = useMemo<Sections | "all">(() => {
    if (query.section && isSectionValid(query.section)) {
      return query.section as Sections;
    }
    return "all";
  }, [query]);

  const setSelected = (section: Sections | "all") => {
    push(
      {
        href: "/policy",
        query: section === "all" ? undefined : { section },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  useEffect(() => {
    if (query.section && !isSectionValid(query.section)) {
      replace("/policy", undefined, {
        shallow: true,
      });
    }
  }, [query, replace]);

  const itemsObj = useMemo(() => Object.fromEntries(items), [items]);

  const targetDataset = useMemo(
    () => (selected === "all" ? items : [[selected, itemsObj[selected] ?? []]]),
    [items, selected, itemsObj]
  ) as StaticData["items"];

  return (
    <Container>
      <Title>นโยบาย</Title>
      <Stack>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          เลือกดูตามฝ่ายงาน
        </Text>
        <ButtonGroup
          display={{ base: "none", sm: "block" }}
          spacing={"0"}
          colorScheme="orange"
        >
          <Box gap={"2"} display={"flex"} flexWrap="wrap">
            {sectionsToSelect.map(([name, section]) => (
              <Button
                key={name}
                variant={selected === name ? "solid" : "outline"}
                onClick={() => setSelected(name as Sections)}
              >
                {section}
              </Button>
            ))}
          </Box>
        </ButtonGroup>
        <Select
          onChange={(e) => setSelected(e.target.value as Sections)}
          display={{ base: "block", sm: "none" }}
          focusBorderColor="orange.500"
        >
          {sectionsToSelect.map(([name, section]) => (
            <option key={name} value={name}>
              {section}
            </option>
          ))}
        </Select>
      </Stack>
      <Box display="flex" gap="6" flexDirection={"row"} flexWrap="wrap">
        {targetDataset.map(([name, items], index) => {
          return items.map((item) => (
            <LinkBox
              my="0"
              as="article"
              w="full"
              display="flex"
              alignItems={{ base: "flex-start", sm: "center" }}
              flexDirection={{ base: "column", sm: "row" }}
              key={`${item.name}_${index}`}
              p="5"
              borderWidth="1px"
              rounded="md"
            >
              <Heading size="md" my="2" flexGrow="1" mr="6">
                <NextLink href={`/policy/${name}/${item.name}`} passHref>
                  <LinkOverlay>{item.metadata.title}</LinkOverlay>
                </NextLink>
              </Heading>
              <Tag
                flexShrink={"0"}
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
