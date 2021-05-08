import { Formik, Form } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import ArgonTextInput from "../../app/common/form/ArgonTextInput";
import { updateUserPassword } from "../../app/firestore/firebaseService";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  return (
    <>
      <Segment>
        <Header dividing size="large" content="Account" />
        {currentUser?.providerId === "password" && (
          <>
            <Header color="teal" sub content="Change Password" />
            <p>Use this form to change the password</p>
            <Formik
              initialValues={{ newPassword: "", confirmPassord: "" }}
              validationSchema={Yup.object({
                newPassword: Yup.string().required("Password is Required"),
                confirmPassord: Yup.string().oneOf(
                  [Yup.ref("newPassword"), null],
                  "Password do not match"
                ),
              })}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  await updateUserPassword(values);
                } catch (error) {
                  setErrors({ auth: error.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form className="ui form">
                  <ArgonTextInput
                    name="newPassword"
                    type="password"
                    placeholder="Password"
                  />
                  <ArgonTextInput
                    name="confirmPassord"
                    type="password"
                    placeholder="Confirm Password"
                  />

                  {errors.auth && (
                    <Label
                      basic
                      color="red"
                      style={{ marginBottom: 10 }}
                      content={errors.auth}
                    />
                  )}
                  <Button
                    style={{ display: "block" }}
                    loading={isSubmitting}
                    disabled={!isValid || !dirty || isSubmitting}
                    type="submit"
                    positive
                    size="large"
                    content="Update Password"
                    color="teal"
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
        {currentUser?.providerId === "facebook.com" && (
          <>
            <Header color="teal" sub content="Facebook Account" />
            <p>Please visit facebook to update your account</p>
            <Button
              as={Link}
              to="https://facebook.com"
              icon="facebook"
              color="facebook"
              content="Go to Faceboook"
            />
          </>
        )}
        {currentUser?.providerId === "google.com" && (
          <>
            <Header color="teal" sub content="Google Account" />
            <p>Please visit google to update your account</p>
            <Button
              as={Link}
              to="https://google.com"
              icon="google"
              color="google plus"
              content="Go to Google"
            />
          </>
        )}
      </Segment>
    </>
  );
}
