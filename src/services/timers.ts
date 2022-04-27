type Callback = () => unknown;

export const runAfterInterval = (callback: Callback, time: number) => {
  setTimeout(() => {
    callback();
  }, time);
};

export const repeatEachInterval = (callback: Callback, time: number) => {
  setInterval(() => {
    callback();
  }, time);
};