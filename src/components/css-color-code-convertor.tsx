import { useRef, useState } from "react";

import { isEqual } from "../utils/utils";
import {
  convertColorCodes,
  resetColorValues,
} from "../utils/css-color-code-convertor/utils";
import { validations } from "../utils/css-color-code-convertor/validations";
import { colorCodeFieldsConfig } from "../utils/css-color-code-convertor/fields-config";

import { InputChangeEventHandler } from "../types/types";
import { defaultValue } from "../types/css-color-code-convertor";

import "../styles/css-color-code-convertor.css";

export const CSSColorCodeConvertor = () => {
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

  return (
    <main className="page css-ccc">
      <div className="css-ccc_content">
        {colorCodeFieldsConfig.map((config) => {
          return (
            <div key={config.key} className="css-ccc_field-group">
              <label className="css-ccc_field-label label">
                {config.label}
              </label>
              {config.inputType === "single" ? (
                <input
                  {...config.inputProps(value)}
                  onChange={onValueChange(config)}
                  className="css-ccc_field-input input"
                />
              ) : (
                <div className="css-ccc_field-input-group">
                  {config.inputProps(value).map((inputProp) => (
                    <input
                      {...inputProp}
                      key={inputProp.name}
                      onChange={onValueChange(config)}
                      className="css-ccc_field-input input"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={colorPreviewerRef} className="css-ccc_color-previewer box" />
      </div>
    </main>
  );
};
