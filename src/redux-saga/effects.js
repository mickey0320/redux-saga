export const take = (actionType) => {
  return {
    type: "TAKE",
    actionType,
  };
};

export const put = (action) => {
  return {
    type: "PUT",
    action,
  };
};

export const call = (fn, ...args) => {
  let context = null;
  if (Array.isArray(fn)) {
    context = fn[0];
    fn = fn[1];
  }
  return {
    type: "CALL",
    payload: {
      fn,
      args,
      context,
    },
  };
};

export const delay = (ms, value) => {
  return call(delayPromise, ms, value);
};

const delayPromise = (ms, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
};

export const fork = (task) => {
  return {
    type: "FORK",
    task,
  };
};

export function* takeEvery(actionType, task) {
  yield fork(function* () {
    while (true) {
      yield take(actionType);
      yield task();
    }
  });
}

export const all = (fns) => {
  return {
    type: "ALL",
    fns,
  };
};

export const cancel = (task) => {
  return {
    type: "CANCEL",
    task,
  };
};

// export const
