import React from "react";
import { connect } from "react-redux";

import actions from "./store/actions";

const Counter = (props) => {
  return (
    <div>
      <p>{props.num}</p>
      <button onClick={() => props.add(1)}>加1</button>
      <button onClick={() => props.asyncAdd(1)}>异步加1</button>
      <button onClick={() => props.minus(1)}>减1</button>
      <button onClick={() => props.asyncMinus(1)}>异步减1</button>
      <button onClick={() => props.cancel()}>取消减1</button>
    </div>
  );
};

export default connect(
  (state) => ({
    num: state.num,
  }),
  actions
)(Counter);
