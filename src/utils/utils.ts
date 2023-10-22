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

export const pageList = ["color-code-convertor", "todo-list"] as const;
export type Page = (typeof pageList)[number];

export const pageHeaderMap: Record<Page, string> = {
  "color-code-convertor": "Color Code Convertor",
  "todo-list": "Todo List",
};

export const pageLocalStorageMap: Partial<Record<Page, string>> = {
  "todo-list": "todo-list",
};

export const dateDiffInDays = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
