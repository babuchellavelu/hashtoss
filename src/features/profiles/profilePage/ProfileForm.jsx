import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";

import ArgonTextInput from "../../../app/common/form/ArgonTextInput";
import ArgonTextAreaInput from "../../../app/common/form/ArgonTextAreaInput";
import { updateUserProfile } from "../../../app/firestore/firestoreService";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <ArgonTextInput name="displayName" placeholder="Display Name" />
          <ArgonTextAreaInput name="description" placeholder="Description" />

          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
            type="submit"
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      )}
    </Formik>
  );
}
