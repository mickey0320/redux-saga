import EventEmitter from "events";

import { times } from "./util";

function createSagaMiddleware() {
  const eventEmitter = new EventEmitter();
  function sagaMiddleware({ dispatch, getState }) {
    const run = function (gen, callback) {
      const g = typeof gen === "function" ? gen() : gen;
      function next(val) {
        const { done, value } = g.next(val);
        if (done) {
          callback && callback();
          return;
        }
        if (value.then) {
          value.then(next);
        } else if (typeof value[Symbol.iterator] === "function") {
          run(value);
          next();
        } else {
          switch (value.type) {
            case "TAKE":
              eventEmitter.once(value.actionType, next);
              break;
            case "PUT":
              dispatch(value.action);
              next(value.action);
              break;
            case "CALL":
              const { fn, args, context } = value.payload;
              fn.apply(context, args).then(next);
              break;
            case "FORK":
              const task = value.task();
              run(task);
              next(task);
              break;
            case "ALL":
              const fns = value.fns;
              const done = times(next, fns.length);
              fns.forEach((fn) => run(fn, done));
              break;
            case "CANCEL":
              const gen = value.task;
              gen.return("end");
          }
        }
      }
      next();
    };

    sagaMiddleware.run = run;

    return (next) => {
      return (action) => {
        eventEmitter.emit(action.type, action);
        return next(action);
      };
    };
  }
  return sagaMiddleware;
}

export default createSagaMiddleware;
