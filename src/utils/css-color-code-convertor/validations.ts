import { keys } from "../utils";

import {
  ColorCode,
  ColorCodeValue,
} from "../../types/css-color-code-convertor";

type ValidationFnMap = {
  [key in ColorCode]: (value: ColorCodeValue[key]) => boolean;
};

const regex = {
  // TODO: support three character HEX
  hexWithHash: /^#([0-9A-F]{3}){1,2}$/i,
  hexWithoutHash: /^([0-9A-F]{3}){1,2}$/i,
  hexCharacterWithHash: /^#([0-9A-F]){6}/i,
  hexCharacterWithoutHash: /^([0-9A-F]){6}/i,
};

export const hexValidator = (value: ColorCodeValue["HEX"]) => {
  const hasHash = value[0] === "#";
  const hexRegexp = hasHash ? regex.hexWithHash : regex.hexWithoutHash;
  const hexLenRegexp = hasHash
    ? regex.hexCharacterWithHash
    : regex.hexCharacterWithoutHash;
  return hexRegexp.test(value) && hexLenRegexp.test(value);
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
