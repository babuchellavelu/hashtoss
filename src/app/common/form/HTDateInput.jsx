import React from "react";
import { useField, useFormikContext } from "formik";
import { Label, FormField } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HTDateInput({ label, ...props }) {
  /* The below line is used to select the date to replace the onchange code 'onChange={(e, d) => helpers.setValue(d.value)}' */
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
