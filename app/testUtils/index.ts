export const wrapThrowable = (funcThatThrows: any, args: Array<any>) => {
  /* */
  return function() {
    funcThatThrows.apply(null, args);
  };
};
