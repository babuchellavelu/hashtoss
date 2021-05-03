import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import cuid from "cuid";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ArgonTextInput from "../../../app/common/form/ArgonTextInput";
import ArgonTextAreaInput from "../../../app/common/form/ArgonTextAreaInput";
import ArgonSelectInput from "../../../app/common/form/ArgonSelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import ArgonDateInput from "../../../app/common/form/ArgonDateInput";

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector((state) =>
    state.objEventReducer.events.find((e) => e.id === match.params.id)
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide the Title"),
    category: Yup.string().required("You must provide the Category"),
    description: Yup.string().required("You must provide the Description"),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Babu",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <ArgonTextInput name="title" placeholder="Event Title" />
            <ArgonSelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <ArgonTextAreaInput
              name="description"
              placeholder="Description"
              rows={3}
            />
            <Header sub color="teal" content="Event Location Details" />
            <ArgonTextInput name="city" placeholder="City" />
            <ArgonTextInput name="venue" placeholder="Venue" />
            <ArgonDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content={selectedEvent ? "Update" : "Submit"}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              floated="right"
              content="Cancel"
              as={Link}
              to="/events"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
