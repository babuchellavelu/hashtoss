import { Dimmer, Loader } from "semantic-ui-react";
import React from "react";

export default function LoadingComponent({
  inverted = true,
  content = "Leading...",
}) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}
