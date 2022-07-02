import { sections } from "../../utils/metadata";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import Container from "../../components/layout/container";
import Link from "../../components/Link";
import { Stack, Text, Textarea, Button, useToast } from "@chakra-ui/react";
import Title from "../../components/Title";
import { useCallback, useMemo, useRef, useEffect } from "react";
import { StaticData } from "../../utils/staticProps/viewSurvey";
import { AuthStatus, SurveyItem } from "../../components/survey";
import { useAuth, useSurveyAnswered } from "../../utils/userStore";
import {
  withSurveyStore,
  SurveyContext,
  useStore,
} from "../../utils/surveyStore";
import { useRouter } from "next/router";
import { scrollToTarget } from "../../utils/scroll";
import { logEvent, withAnalytics } from "../../utils/analytics";

export {
  getStaticProps,
  getStaticPaths,
} from "../../utils/staticProps/viewSurvey";

function SectionSurvey({ items, section }: StaticData) {
  const toast = useToast();
  const { replace } = useRouter();
  const isAnswered = useSurveyAnswered(section);
  const title = useMemo(() => `แบบสอบถาม${sections[section]}`, [section]);
  const commentValue = useRef<string>("");
  const selected = useStore((store) => store.selected);
  const submitting = useStore((store) => store.submitting);

  useEffect(() => {
    if (isAnswered && !submitting) {
      replace("/survey");
    }
  }, [submitting, isAnswered, replace]);

  const setHasError: SurveyContext["setHasError"] = useStore(
    (state) => state.setHasError
  );
  const setSubmitting: SurveyContext["setSubmitting"] = useStore(
    (state) => state.setSubmitting
  );

  const afterSubmit = useCallback(async () => {
    if (selected.some((v) => v === undefined)) return;
    const snapshot = useAuth.getState();
    try {
      await snapshot.answerSurvey(section, selected as number[]);
      withAnalytics((analytics) =>
        logEvent(analytics, "unlock_achievement", {
          achievement_id: section,
        })
      );
      setTimeout(
        () =>
          toast({
            title: "ตอบแบบสอบถามเรียบร้อยแล้ว",
            description: snapshot.metadata?.sections
              ? undefined
              : "คุณสามารถแชร์ลงใน Social Media ได้แล้วในตอนนี้",
            status: "success",
            duration: 5000,
            isClosable: true,
          }),
        200
      );
    } catch (err) {
      toast({
        title: "ตอบแบบสอบถามไม่สำเร็จ",
        description: (err as any).message
          ? `${(err as any).message}`
          : "เกิดข้อผิดพลาด",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setSubmitting(false);
  }, [section, selected, setSubmitting, toast]);

  const listener = useRef<() => void>();
  const timeout = useRef<NodeJS.Timeout>();
  const setupListener = useCallback(() => {
    const started = window.location.pathname;
    listener.current = useAuth.subscribe((state, prev) => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        listener.current && listener.current();
        if (window.location.pathname !== started) return;
        if (state.user) {
          console.log("Automatically continue afterSubmit");
          afterSubmit();
        } else {
          setSubmitting(false);
        }
      }, 2000);
    });
  }, [afterSubmit, setSubmitting]);

  const submit = useCallback(() => {
    const unanswered = selected.indexOf(undefined);

    if (unanswered !== -1) {
      scrollToTarget(document.getElementById(`survey_${unanswered}`));
      setHasError(true);
      return;
    }
    setHasError(false);
    setSubmitting(true);
    if (!useAuth.getState().metadata) {
      useAuth.setState({ showProfile: true });
      setupListener();
      return;
    }
    afterSubmit();
  }, [selected, setHasError, setSubmitting, afterSubmit, setupListener]);

  return (
    <Container>
      <Stack spacing="4" direction={{ base: "column", md: "row" }}>
        <Stack flexGrow={1} gap="1.5">
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
        <AuthStatus />
      </Stack>
      <Stack>
        {items.map((item, index) => (
          <SurveyItem key={item.name} item={item} index={index} />
        ))}
      </Stack>
      <Stack>
        <Text fontWeight="bold">ข้อคิดเห็นเพิ่มเติม:</Text>
        <Textarea
          isDisabled={submitting}
          onChange={(e) => {
            commentValue.current = e.target.value.trim();
          }}
          focusBorderColor="orange.400"
          rows={2}
          py="3"
          placeholder="แสดงความคิดเห็นได้เลย"
        />
      </Stack>
      <Stack py="4" justifyContent={"center"} alignItems="center">
        <Button
          isDisabled={submitting}
          onClick={submit}
          w="full"
          maxW="md"
          colorScheme={"orange"}
        >
          ส่งคำตอบ
        </Button>
      </Stack>
    </Container>
  );
}

export default withSurveyStore(SectionSurvey);
