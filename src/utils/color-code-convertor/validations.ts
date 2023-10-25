import { keys } from "../utils";

import { ColorCode, ColorCodeValue } from "../../types/color-code-convertor";

type ValidationFnMap = {
  [key in ColorCode]: (value: ColorCodeValue[key]) => boolean;
};

const regex = {
  hex: /^#([0-9a-fA-F]){6}$/i,
};

export const hexValidator = (value: ColorCodeValue["HEX"]) => {
  return regex.hex.test(value);
};

export const hslValidator = (value: ColorCodeValue["HSL"]) => {
  return keys(value).every((key) => {
    const val = value[key];
    return val !== "" && !isNaN(+val) && val.length > 0 && val.length < 4;
  });
};

export const rgbValidator = (value: ColorCodeValue["RGB"]) => {
  return keys(value).every((key) => {
    const val = value[key];
    return val !== "" && !isNaN(+val) && val.length > 0 && val.length < 4;
  });
};

export const validations: ValidationFnMap = {
  HEX: hexValidator,
  HSL: hslValidator,
  RGB: rgbValidator,
};
