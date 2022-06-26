import { Analytics, getAnalytics, logEvent } from "@firebase/analytics";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { app } from "./firebase";

type AnalyticsHandler = (analytics: Analytics) => void;

const analytics = (): Analytics => getAnalytics(app);

function canLoad(): boolean {
  return typeof window !== "undefined"; //&& process.env.NODE_ENV === "production";
}

function withAnalytics(handler: AnalyticsHandler): void {
  if (canLoad()) {
    return handler(analytics());
  }
}

function usePageEvent(): void {
  const router = useRouter();
  useEffect(() => {
    withAnalytics((analytics) => {
      const log = (url: string): void => {
        // @ts-ignore
        logEvent(analytics, "screen_view", {
          screen_name: url,
        });
      };

      router.events.on("routeChangeComplete", log);
      log(router.pathname);

      return () => {
        router.events.off("routeChangeComplete", log);
      };
    });
  }, [router.events, router.pathname]);
}

export { analytics, withAnalytics, usePageEvent, logEvent };
