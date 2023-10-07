export type ColorCode = "HEX" | "RGB" | "HSL";
export type ColorCodeValue = {
  HEX: string;
  RGB: {
    r: string;
    g: string;
    b: string;
  };
  HSL: {
    h: string;
    s: string;
    l: string;
  };
};
export type Value = ColorCodeValue & { active: ColorCode | "unknown" };

export const defaultValue: Value = {
  active: "unknown",
  HEX: "",
  RGB: {
    r: "",
    g: "",
    b: "",
  },
  HSL: {
    h: "",
    s: "",
    l: "",
  },
};
