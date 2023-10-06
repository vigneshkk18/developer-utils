import { keys, objMapper } from "../utils";

import { Value, defaultValue } from "../../types/css-color-code-convertor";

// color convertor - start

const hexToRGB = (hex: string) => {
  // Remove the '#' character if it's present
  hex = hex.replace(/^#/, "");

  // Parse the hexadecimal values for red, green, and blue components
  const r = parseInt(hex.slice(0, 2), 16).toString();
  const g = parseInt(hex.slice(2, 4), 16).toString();
  const b = parseInt(hex.slice(4, 6), 16).toString();

  return { r, g, b };
};

const hexToHSL = (hex: string) => {
  const { r, g, b } = hexToRGB(hex);
  return rgbToHSL(+r, +g, +b);
};

const rgbToHex = (R: number, G: number, B: number): string => {
  const [r, g, b] = [R, G, B].map((value) => {
    const hexValue = value.toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });

  return `#${r}${g}${b}`;
};

const rgbToHSL = (R: number, G: number, B: number) => {
  const [r, g, b] = [R, G, B].map((value) => value / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360).toString(),
    s: Math.round(s * 100).toString(),
    l: Math.round(l * 100).toString(),
  };
};

const hslToRGB = (h: number, s: number, l: number) => {
  const h360 = h / 360; // Normalize hue to [0, 1]
  const s100 = s / 100; // Normalize saturation to [0, 1]
  const l100 = l / 100; // Normalize lightness to [0, 1]

  // Convert HSL to RGB
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l100;
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l100 < 0.5 ? l100 * (1 + s100) : l100 + s100 - l100 * s100;
    const p = 2 * l100 - q;
    r = hueToRgb(p, q, h360 + 1 / 3);
    g = hueToRgb(p, q, h360);
    b = hueToRgb(p, q, h360 - 1 / 3);
  }

  // Convert RGB to [0, 255] range
  const to255 = (code: number) => Math.round(code * 255);

  return {
    r: to255(r).toString(),
    g: to255(g).toString(),
    b: to255(b).toString(),
  };
};

const hslToHEX = (h: number, s: number, l: number) => {
  const { r, g, b } = hslToRGB(h, s, l);
  return rgbToHex(+r, +g, +b);
};

export const convertColorCodes = (value: Value) => {
  const updatedValue = { ...value };
  if (value.active === "unknown") return updatedValue;
  switch (value.active) {
    case "HEX": {
      let codeValue = value[value.active];
      if (codeValue[0] !== "#") codeValue = `#${codeValue}`;
      updatedValue["HEX"] = codeValue;
      updatedValue["HSL"] = hexToHSL(codeValue);
      updatedValue["RGB"] = hexToRGB(codeValue);
      return updatedValue;
    }
    case "RGB": {
      const codeValue = objMapper(value[value.active], (v) => +v);
      updatedValue["HEX"] = rgbToHex(codeValue.r, codeValue.g, codeValue.b);
      updatedValue["HSL"] = rgbToHSL(codeValue.r, codeValue.g, codeValue.b);
      return updatedValue;
    }
    case "HSL": {
      const codeValue = objMapper(value[value.active], (v) => +v);
      updatedValue["HEX"] = hslToHEX(codeValue.h, codeValue.s, codeValue.l);
      updatedValue["RGB"] = hslToRGB(codeValue.h, codeValue.s, codeValue.l);
      return updatedValue;
    }
    default:
      return updatedValue;
  }
};

// color convertor - end

export const resetColorValues = (active: Value["active"], value: Value) => {
  if (active === "unknown") return value;
  keys(value).forEach((key) => {
    if (key === "active" || key === active) return;
    (value as any)[key] = defaultValue[key];
  });
};
