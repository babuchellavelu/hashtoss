import React from "react";
import { useField } from "formik";
import { Label, FormField } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ArgonDateInput({ lable, ...props }) {
  const [field, meta, helpers] = useField(props);
  console.log(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{lable}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(e, d) => helpers.setValue(d.value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
