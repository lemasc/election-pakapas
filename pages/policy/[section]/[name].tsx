import { Stack } from "@chakra-ui/react";
import { PolicyData } from "../../../utils/server";
import { NextPage } from "next";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Container from "../../../components/layout/container";
import Link from "../../../components/Link";
import Title from "../../../components/Title";

import ReactMarkdown from "react-markdown";

export {
  getStaticPaths,
  getStaticProps,
} from "../../../utils/staticProps/viewPolicy";

const ViewPolicyPage: NextPage<PolicyData> = ({ content, metadata }) => {
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
      <ReactMarkdown className="content">{content}</ReactMarkdown>
    </Container>
  );
};

export default ViewPolicyPage;
