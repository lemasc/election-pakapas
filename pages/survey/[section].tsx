import { GetStaticPaths, GetStaticProps } from "next";
import { Sections, isSectionValid, sections } from "../../utils/metadata";
import { getPoliciesFromDir, getPolicy } from "../../utils/server";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import Container from "../../components/layout/container";
import Link from "../../components/Link";
import {
  BackgroundProps,
  Box,
  Stack,
  Text,
  ThemeTypings,
} from "@chakra-ui/react";
import Title from "../../components/Title";
import { useMemo, useState } from "react";
import IconButton from "../../components/IconButton";
import {
  faFaceAngry,
  faFaceFrown,
  faFaceMeh,
  faFaceSmile,
  faSmileBeam,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type PolicyList = {
  name: string;
  title: string;
};

type StaticParam = {
  section: Sections;
};

type StaticData = {
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

type Buttons = {
  icon: IconDefinition;
  colorScheme: ThemeTypings["colorSchemes"];
  label: string;
};
const buttons: Buttons[] = [
  {
    icon: faFaceAngry,
    colorScheme: "red",
    label: "ไม่เห็นด้วยอย่างยิ่ง",
  },
  {
    icon: faFaceFrown,
    colorScheme: "orange",
    label: "ไม่เห็นด้วย",
  },
  {
    icon: faFaceMeh,
    colorScheme: "yellow",
    label: "เฉย ๆ",
  },
  {
    icon: faFaceSmile,
    colorScheme: "green",
    label: "เห็นด้วย",
  },
  {
    icon: faSmileBeam,
    colorScheme: "teal",
    label: "เห็นด้วยอย่างยิ่ง",
  },
];
export default function SectionSurvey({ items, section }: StaticData) {
  const [selected, setSelected] = useState(
    Array<number | undefined>(items.length).fill(undefined)
  );
  const title = useMemo(() => `แบบสอบถาม${sections[section]}`, [section]);
  return (
    <Container>
      <Stack gap="1.5">
        <Link
          href="/survey"
          fontSize="sm"
          color={"orange.500"}
          _hover={{ color: "orange.600", textDecoration: "underline" }}
          title="กลับไปยังหน้ารวมนโยบาย"
        >
          <ChevronLeftIcon w="5" h="5" mt="-0.5" />
          กลับไปยังหน้าแบบสอบถาม
        </Link>

        <Title subHeading>{title}</Title>
      </Stack>
      <Stack>
        {items.map((v, i) => (
          <Stack
            py="4"
            px="6"
            rounded="md"
            _hover={{ bg: "gray.50" }}
            borderColor="gray.300"
            borderWidth="1px"
            key={v.name}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Stack spacing={"0.5"} flexDirection={"column"} flexGrow={1}>
              <Text fontSize="lg" mt="1" as="b" fontWeight="medium">
                {v.title}
              </Text>
              <Link
                color="blue.600"
                _hover={{ color: "blue.700", textDecoration: "underline" }}
                isExternal
                fontSize="sm"
                href={`/policy/${section}/${i}`}
              >
                <ExternalLinkIcon mt="-1" mx="2px" /> อ่านรายละเอียดเพิ่มเติม
              </Link>
            </Stack>
            <Stack flexShrink="0" direction={"row"} alignItems="center">
              {buttons.map(({ label, colorScheme, ...props }, value) => (
                <IconButton
                  label={label}
                  key={`${label}_${value}`}
                  colorScheme={selected[i] === value ? colorScheme : undefined}
                  variant={selected[i] === value ? "solid" : "ghost"}
                  onClick={() => {
                    setSelected((v) => {
                      const target = [...v];
                      target[i] = value;
                      return target;
                    });
                  }}
                  h="10"
                  w="10"
                  iconProps={{
                    size: "lg",
                  }}
                  {...props}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
