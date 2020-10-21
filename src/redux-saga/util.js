export const times = (fn, count) => {
  let len = 0;
  return () => {
    if (++len === count) {
      fn();
    }
  };
};
