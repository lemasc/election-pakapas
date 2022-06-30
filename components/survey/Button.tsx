import { ThemeTypings } from "@chakra-ui/react";
import { memo } from "react";
import IconButton from "../../components/IconButton";
import {
  faFaceAngry,
  faFaceFrown,
  faFaceMeh,
  faFaceSmile,
  faSmileBeam,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import { useStore, useStoreApi } from "../../utils/surveyStore";

type Buttons = {
  icon: IconDefinition;
  colorScheme: ThemeTypings["colorSchemes"];
  label: string;
};

export const buttons: Buttons[] = [
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

type SurveyButtonProps = Buttons & {
  value: number;
  currentValue: number | undefined;
  index: number;
};

const SurveyButton = ({
  label,
  colorScheme,
  value,
  currentValue,
  index,
  ...props
}: SurveyButtonProps) => {
  const api = useStoreApi();
  const submitting = useStore((state) => state.submitting);
  return (
    <IconButton
      label={label}
      key={`${label}_${value}`}
      isDisabled={submitting}
      colorScheme={currentValue === value ? colorScheme : undefined}
      variant={currentValue === value ? "solid" : "ghost"}
      onClick={() =>
        api.setState((state) => {
          const target = Object.assign({}, state);
          target.selected[index] = value;
          return target;
        })
      }
      h="10"
      w="10"
      iconProps={{
        size: "lg",
      }}
      {...props}
    />
  );
};

export default memo(SurveyButton);
