import { useEffect, useMemo } from "react";
import { Stack } from "@chakra-ui/react";
import { PolicyData } from "../../../utils/server";
import { NextPage } from "next";
import Head from "next/head";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Container from "../../../components/layout/container";
import Link from "../../../components/Link";
import Title from "../../../components/Title";

import Markdown from "../../../components/markdown";
import { partialContent } from "../../../utils/content";
import { analytics, logEvent, withAnalytics } from "../../../utils/analytics";
import { useRouter } from "next/router";

export {
  getStaticPaths,
  getStaticProps,
} from "../../../utils/staticProps/viewPolicy";

const ViewPolicyPage: NextPage<PolicyData> = ({ content, metadata }) => {
  const { query } = useRouter();
  const description = useMemo(() => partialContent(content), [content]);

  useEffect(() => {
    const { name, section } = query ?? {};
    if (
      name &&
      section &&
      metadata &&
      typeof name === "string" &&
      typeof section === "string"
    ) {
      withAnalytics((analytics) => {
        logEvent(analytics, "view_item", {
          items: [
            {
              item_category: section,
              item_name: metadata.title,
              item_id: name,
            },
          ],
        });
      });
    }
  }, [query, metadata]);

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
        <Title subHeading>{metadata.title}</Title>
      </Stack>
      <Markdown>{content}</Markdown>
      <Head>
        <meta
          property="og:description"
          key="description"
          content={description}
        />
      </Head>
    </Container>
  );
};

export default ViewPolicyPage;
