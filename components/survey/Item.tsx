import Link from "../../components/Link";
import { Stack, Text } from "@chakra-ui/react";
import { useState, useEffect, memo } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import shallow from "zustand/shallow";
import { PolicyList } from "../../utils/staticProps/viewSurvey";
import { useStoreApi, useStore } from "../../utils/surveyStore";
import SurveyButton, { buttons } from "./Button";

function SurveyItem({ index, item }: { index: number; item: PolicyList }) {
  const { hasError, section } = useStore(
    ({ hasError, section }) => ({ hasError, section }),
    shallow
  );
  const api = useStoreApi();
  const [currentValue, setCurrentValue] = useState<number | undefined>();
  useEffect(
    () =>
      api.subscribe((state) => {
        setCurrentValue(state.selected[index]);
      }),
    [api, index]
  );
  return (
    <Stack
      id={`survey_${index}`}
      py="4"
      px="6"
      rounded="md"
      _hover={{ bg: "gray.50" }}
      borderColor={
        hasError && currentValue === undefined ? "red.500" : "gray.300"
      }
      borderWidth="1px"
      flexDirection={{ base: "column", sm: "row" }}
      alignItems={"center"}
    >
      <Stack
        spacing={"0.5"}
        flexDirection={"column"}
        flexGrow={1}
        textAlign={{ base: "center", sm: "unset" }}
        alignItems={{ base: "center", sm: "flex-start" }}
        mr="4"
      >
        <Text fontSize="lg" mt="1" as="b" fontWeight="medium">
          {item.title}
        </Text>
        <Link
          color="blue.600"
          _hover={{ color: "blue.700", textDecoration: "underline" }}
          isExternal
          fontSize="sm"
          href={`/policy/${section}/${index}`}
        >
          <ExternalLinkIcon mt="-1" mx="2px" /> อ่านรายละเอียดเพิ่มเติม
        </Link>
      </Stack>
      <Stack flexShrink="0" direction={"row"} alignItems="center">
        {buttons.map((props, value) => (
          <SurveyButton
            key={props.label}
            {...props}
            {...{ currentValue, value, index }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(SurveyItem);
