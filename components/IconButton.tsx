import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import {
  ButtonProps,
  ComponentWithAs,
  Icon,
  IconButton as UIIconButton,
} from "@chakra-ui/react";

import React from "react";

export type Props = {
  label: string;
  icon: FontAwesomeIconProps["icon"];
  iconProps?: Omit<FontAwesomeIconProps, "icon">;
} & React.ComponentProps<ComponentWithAs<"button">> &
  ButtonProps;

export default function IconButton({ icon, label, iconProps, ...rest }: Props) {
  return (
    <UIIconButton
      aria-label={label}
      title={label}
      icon={<Icon as={() => <FontAwesomeIcon icon={icon} {...iconProps} />} />}
      {...rest}
    />
  );
}
