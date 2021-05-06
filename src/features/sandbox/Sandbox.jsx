import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const data = useSelector((state) => state.objTestReducer.data);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.async);

  const [target, setTarget] = useState(null);

  return (
    <>
      <h1> Testing Terror Mithran and Kanishka</h1>
      <h3>Data is : {data}</h3>
      <Button
        name="increment"
        loading={loading && target === "increment"}
        color="green"
        content="Increment"
        onClick={(e) => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
      />

      <Button
        name="decrement"
        loading={loading && target === "decrement"}
        color="red"
        content="Decrement"
        onClick={(e) => {
          dispatch(decrement(5));
          setTarget(e.target.name);
        }}
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
