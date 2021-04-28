import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import cuid from "cuid";

export default function EventForm({
  setFormOpen,
  setEvents,
  createEvent,
  selectedEvent,
  updateEvent,
}) {
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };
  const [values, setValues] = useState(initialValues);

  function handleFormHandler() {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: "Babu",
          attendees: [],
          hostPhotoURL: "/assets/user.png",
        });
    setFormOpen(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit the Event" : "Create New Event"} />
      <Form onSubmit={handleFormHandler}>
        <Form.Field>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={values.title}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={values.date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="submit"
          floated="right"
          content="Cancel"
          as={Link}
          to="/events"
        />
      </Form>
    </Segment>
  );
}
