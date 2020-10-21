import { take, put, delay, takeEvery, all, fork, cancel } from "../../redux-saga/effects";
import { ASYNCADD, ADD, ASYNCMINUS, MINUS, CANCEL } from "../action-types";

// const delay = (ms, value) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(value);
//     }, ms);
//   });
// };

function* task1() {
  while (true) {
    yield take(ASYNCADD);
    yield delay(1000);
    yield put({ type: ADD, payload: 1 });
  }
}
// function* task2() {
//   while (true) {
//     yield take(ASYNCMINUS);
//     yield delay(1000);
//     yield put({ type: MINUS, payload: 1 });
//   }
// }
function* task() {
  while (true) {
    yield take(ASYNCMINUS);
    yield delay(1000);
    yield put({ type: MINUS, payload: 1 });
  }
}
function* task2() {
  const t = yield fork(task);
  yield take(CANCEL);
  yield cancel(t);
}
// function* rootSaga() {
//   yield take(ASYNCADD);
//   yield delay(1000);
//   yield put({ type: ADD, payload: 1 });
// yield takeEvery(ASYNCADD, task);
// }

function* rootSaga() {
  yield all([task1(), task2()]);
  console.log("next");
}

export default rootSaga;
