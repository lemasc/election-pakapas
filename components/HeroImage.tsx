import DynamicImage from "./DynamicImage";
import home from "../public/background/home.jpg";
import home_mobile from "../public/background/home_mobile.jpg";
import { useBreakpointValue } from "@chakra-ui/react";

export default function HeroImage() {
  const photoIndex = useBreakpointValue(
    { base: 1, sm: 0 },
    {
      fallback: "sm",
    }
  ) as number;
  return (
    <DynamicImage
      priority
      alt="Home Background"
      index={photoIndex}
      src={[home, home_mobile]}
      placeholder="blur"
      width={["1920", "1080"]}
      height={["1080", "1920"]}
    />
  );
}
