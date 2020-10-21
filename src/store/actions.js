import { ADD, ASYNCADD, ASYNCMINUS, MINUS, CANCEL } from "./action-types";

export default {
  add(value) {
    return {
      type: ADD,
      payload: value,
    };
  },
  minus(value) {
    return {
      type: MINUS,
      payload: value,
    };
  },
  asyncAdd() {
    return {
      type: ASYNCADD,
    };
  },
  asyncMinus() {
    return {
      type: ASYNCMINUS,
    };
  },
  cancel() {
    return {
      type: CANCEL,
    };
  },
};
