import { Value, ColorCode } from "../../types/color-code-convertor";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type valueMapper = (
  value: Value
) => (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => Value;

type ColorCodeFieldsConfig = Array<
  | {
      key: ColorCode;
      label: string;
      inputType: "single";
      valueMapper: valueMapper;
      valueFormatter: (value: Value) => string;
      inputProps: (value: Value) => InputProps;
    }
  | {
      key: ColorCode;
      label: string;
      inputType: "group";
      valueMapper: valueMapper;
      valueFormatter: (value: Value) => string;
      inputProps: (value: Value) => InputProps[];
    }
>;

export const colorCodeFieldsConfig: ColorCodeFieldsConfig = [
  {
    key: "HEX",
    label: "HEX",
    inputType: "single",
    valueMapper:
      (value) =>
      ({ target }) => {
        return { ...value, HEX: target.value };
      },
    valueFormatter: (value) => {
      if (value.HEX[0] === "#") return value.HEX;
      return `#${value.HEX}`;
    },
    inputProps: (value) => ({
      placeholder: "#FFFFFF",
      type: "text",
      name: "HEX",
      maxLength: 7,
      disabled: value.active !== "unknown" && value.active !== "HEX",
      value: value.HEX,
    }),
  },
  {
    key: "RGB",
    label: "RGB",
    inputType: "group",
    valueMapper:
      (value) =>
      ({ target: { name, value: fieldValue } }) => {
        const RGB = { ...value.RGB, [name]: fieldValue };
        return { ...value, RGB };
      },
    valueFormatter: ({ RGB }) => `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`,
    inputProps: (value) => [
      {
        placeholder: "0 - 255",
        type: "number",
        name: "r",
        min: 0,
        max: 255,
        maxLength: 3,
        value: value.RGB.r,
        disabled: value.active !== "unknown" && value.active !== "RGB",
      },
      {
        placeholder: "0 - 255",
        type: "number",
        name: "g",
        min: 0,
        max: 255,
        maxLength: 3,
        value: value.RGB.g,
        disabled: value.active !== "unknown" && value.active !== "RGB",
      },
      {
        placeholder: "0 - 255",
        type: "number",
        name: "b",
        min: 0,
        max: 255,
        maxLength: 3,
        value: value.RGB.b,
        disabled: value.active !== "unknown" && value.active !== "RGB",
      },
    ],
  },
  {
    key: "HSL",
    label: "HSL",
    inputType: "group",
    valueMapper:
      (value) =>
      ({ target: { name, value: fieldValue } }) => {
        const HSL = { ...value.HSL, [name]: fieldValue };
        return { ...value, HSL };
      },
    valueFormatter: ({ HSL }) => `hsl(${HSL.h}, ${HSL.s}, ${HSL.l})`,
    inputProps: (value) => [
      {
        placeholder: "0 - 360",
        type: "number",
        name: "h",
        min: 0,
        max: 360,
        maxLength: 3,
        value: value.HSL.h,
        disabled: value.active !== "unknown" && value.active !== "HSL",
      },
      {
        placeholder: "0 - 100",
        type: "number",
        name: "s",
        min: 0,
        max: 100,
        maxLength: 3,
        value: value.HSL.s,
        disabled: value.active !== "unknown" && value.active !== "HSL",
      },
      {
        placeholder: "0 - 100",
        type: "number",
        name: "l",
        min: 0,
        max: 100,
        maxLength: 3,
        value: value.HSL.l,
        disabled: value.active !== "unknown" && value.active !== "HSL",
      },
    ],
  },
];
