import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const data = useSelector((state) => state.objTestReducer.data);
  const dispatch = useDispatch();
  return (
    <>
      <h1> Testing Terror Mithran and Kanishka</h1>
      <h3>Data is : {data}</h3>
      <Button
        color="green"
        content="Increment"
        onClick={() => dispatch(increment(10))}
      />

      <Button
        color="red"
        content="Decrement"
        onClick={() => dispatch(decrement(5))}
      />

      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        color="teal"
        content="Open Modal"
      />
    </>
  );
}
