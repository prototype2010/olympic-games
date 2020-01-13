'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.wrapThrowable = (funcThatThrows, args) => {
  /* */
  return function() {
    funcThatThrows.apply(null, args);
  };
};
//# sourceMappingURL=index.js.map
