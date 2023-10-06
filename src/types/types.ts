import { ChangeEventHandler } from "react";

export type InputChangeEventHandler = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export type ConvertRecordType<T extends Record<string, any>, V> = Record<
  keyof T,
  V
>;
