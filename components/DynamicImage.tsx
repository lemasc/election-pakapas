/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import { Key, useCallback, useMemo } from "react";

export type Primitive = string | number | boolean | undefined | null;

export type DynamicValues<T> =
  | T
  | (T extends Primitive
      ? T
      : T extends {}
      ? {
          [K in keyof T]: T[K] | T[K][];
        }
      : never);

export type DynamicImageProps = DynamicValues<ImageProps> & {
  src: DynamicValues<ImageProps>["src"];
  key?: Key | null | undefined;
  index: number;
};

export default function DynamicImage({
  index,
  src,
  ...props
}: DynamicImageProps) {
  const propsEntries = useMemo(() => Object.entries(props), [props]);

  const getProps = useCallback(
    (index: number) => {
      return Object.fromEntries(
        propsEntries.map(([key, value]) => {
          return [key, Array.isArray(value) ? value[index] ?? value[0] : value];
        })
      );
    },
    [propsEntries]
  );
  if (Array.isArray(src)) {
    return (
      <Box>
        {src.map((src, i) => (
          <Box
            display={index === i ? undefined : "none"}
            key={`dynamic_img$${i}`}
          >
            <DynamicImage index={index} src={src} {...props} />
          </Box>
        ))}
      </Box>
    );
  }
  return <Image src={src} {...getProps(index)} />;
}
