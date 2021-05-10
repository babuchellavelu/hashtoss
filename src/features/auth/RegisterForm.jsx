import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Divider, Label } from "semantic-ui-react";
import ArgonTextInput from "../../app/common/form/ArgonTextInput";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../app/common/modals/modalReducer";
import { registerInFirebase } from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Sign Up to Re-vents">
      <Formik
        initialValues={{ displayName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <ArgonTextInput name="displayName" placeholder="DisplayName" />
            <ArgonTextInput name="email" placeholder="Email" />
            <ArgonTextInput
              name="password"
              placeholder="Password"
              type="password"
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
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              content="Register"
              color="teal"
            />
            <Divider horizontal>or</Divider>
            <SocialLogin />
            <Button
              onClick={() => {
                dispatch(closeModal());
                dispatch(openModal({ modalType: "LoginForm" }));
              }}
              basic
              fluid
              color="blue"
              content="Already Have Account - Sign In"
              style={{ marginBottom: 10 }}
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
