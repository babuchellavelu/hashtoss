import React, { useState } from "react";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listenToEvents } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ArgonTextInput from "../../../app/common/form/ArgonTextInput";
import ArgonTextAreaInput from "../../../app/common/form/ArgonTextAreaInput";
import ArgonSelectInput from "../../../app/common/form/ArgonSelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
//import ArgonDateInput from "../../../app/common/form/ArgonDateInput";

import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { asyncActionError } from "../../../app/async/asyncReducer";

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector((state) =>
    state.objEventReducer.events.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const dispatch = useDispatch();

  /* Below Code to open Prompt before Cancel - Start */
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  /* Below Code to open Prompt before Cancel - End */

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "May 04, 2021 12:54 AM",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide the Title"),
    category: Yup.string().required("You must provide the Category"),
    description: Yup.string().required("You must provide the Description"),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  async function handleCancelToggle() {
    setConfirmOpen(false);
    setLoadingCancel(true);

    try {
      await cancelEventToggle(selectedEvent);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      dispatch(asyncActionError(error));
    }
  }
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (selectedEvent) => dispatch(listenToEvents([selectedEvent])),
    deps: [match.params.id, dispatch],
    shouldExecute: !!match.params.id,
  });

  if (loading) return <LoadingComponent content="Loading Event ...." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            dispatch(asyncActionError(error));
            setSubmitting(false);
          }
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
            <ArgonTextInput name="date" placeholder="Event Date" />
            {/* <ArgonDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            /> */}
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent?.isCancelled ? "green" : "red"}
                content={selectedEvent.isCancelled ? "Reactive" : "Cancel"}
                onClick={() => setConfirmOpen(true)}
              />
            )}

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
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure?"
            : "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onConfirm={() => handleCancelToggle(selectedEvent)}
        onCancel={() => setConfirmOpen(false)}
      />
    </Segment>
  );
}
