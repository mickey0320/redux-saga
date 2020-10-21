import { ADD, MINUS } from "./action-types";

const defaultState = {
  num: 0,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + action.payload,
      };
    case MINUS:
      return {
        ...state,
        num: state.num - action.payload,
      };
    default:
      return state;
  }
};
