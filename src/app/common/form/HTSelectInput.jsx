import { useField } from "formik";
import React from "react";
import { Label, FormField, Select } from "semantic-ui-react";

export default function HTSelectInput({ lable, ...props }) {
  const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{lable}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
