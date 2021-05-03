import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import ArgonTextInput from "../../app/common/form/ArgonTextInput";
import { useDispatch } from "react-redux";
import { signInUser } from "./authActions";
import { closeModal } from "../../app/common/modals/modalReducer";

export default function LoginForm() {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("You must provide the Email"),
    password: Yup.string().required("You must provide the Password"),
  });

  return (
    <ModalWrapper size="mini" header="Sign In to Re-vents">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <ArgonTextInput name="email" placeholder="Email" />
            <ArgonTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              content="Login"
              color="teal"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
