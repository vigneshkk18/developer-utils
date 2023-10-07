export const keys = <T extends Record<string, any>>(
  obj: T | null | undefined
): Array<keyof T> => {
  if (!obj) return [];
  return Object.keys(obj);
};

export const isEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const objMapper = <T extends object, R>(
  obj: T,
  mapFn: (obj: T[keyof T]) => R
): Record<keyof T, R> => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = mapFn(obj[key]);
    return acc;
  }, {} as Record<keyof T, R>);
};

export const pageHeaderMap = {
  "color-code-convertor": "Color Code Convertor",
};
