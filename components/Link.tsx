import NextLink from "next/link";
import { Link as UILink } from "@chakra-ui/react";

export default function Link({
  href,
  ...props
}: React.ComponentProps<typeof UILink>) {
  return (
    // @ts-ignore Href
    <NextLink href={href} passHref>
      <UILink {...props} />
    </NextLink>
  );
}
