import { useRef, useState } from "react";

import { isEqual } from "../utils/utils";
import {
  convertColorCodes,
  resetColorValues,
} from "../utils/color-code-convertor/utils";
import { validations } from "../utils/color-code-convertor/validations";
import { colorCodeFieldsConfig } from "../utils/color-code-convertor/fields-config";

import { InputChangeEventHandler } from "../types/types";
import { ColorCode, defaultValue } from "../types/color-code-convertor";

import "../styles/color-code-convertor.css";

export const ColorCodeConvertor = () => {
  const [value, setValue] = useState(defaultValue);
  const colorPreviewerRef = useRef<HTMLDivElement>();

  const onValueChange = (config: (typeof colorCodeFieldsConfig)[number]) =>
    ((event) => {
      if (!colorPreviewerRef.current) return;
      const key = config.key;
      let updatedValue = { ...value };

      updatedValue = config.valueMapper(updatedValue)(event);
      updatedValue.active = key;

      const isSameAsInitialValue = isEqual(
        defaultValue[key],
        updatedValue[key]
      );

      if (isSameAsInitialValue) {
        updatedValue.active = "unknown";
        resetColorValues(key, updatedValue);
        colorPreviewerRef.current.style.backgroundColor = "";
      }

      const isValid = validations[key](updatedValue[key as any]);
      if (!isValid) {
        setValue(updatedValue);
        return;
      }

      updatedValue = convertColorCodes(updatedValue);

      colorPreviewerRef.current.style.backgroundColor = updatedValue.HEX;
      setValue(updatedValue);
    }) as InputChangeEventHandler;

  const copyToClipboard = (code: ColorCode) => () => {
    const fieldConfig = colorCodeFieldsConfig.find(
      (config) => config.key === code
    );
    const isSameAsInitialValue = isEqual(defaultValue[code], value[code]);
    if (!fieldConfig || isSameAsInitialValue) return;
    const formattedValue = fieldConfig.valueFormatter(value);
    navigator.clipboard.writeText(formattedValue);
  };

  return (
    <main className="page ccc">
      <div className="ccc_content">
        {colorCodeFieldsConfig.map((config) => {
          return (
            <div key={config.key} className="ccc_field-group">
              <label
                onClick={copyToClipboard(config.key)}
                className="ccc_field-label label ccc_color-code"
              >
                {config.label}
              </label>
              {config.inputType === "single" ? (
                <input
                  {...config.inputProps(value)}
                  onChange={onValueChange(config)}
                  className="ccc_field-input input"
                />
              ) : (
                <div className="ccc_field-input-group">
                  {config.inputProps(value).map((inputProp) => (
                    <input
                      {...inputProp}
                      key={inputProp.name}
                      onChange={onValueChange(config)}
                      className="ccc_field-input input"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={colorPreviewerRef} className="ccc_color-previewer box" />
      </div>
    </main>
  );
};
