'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __asyncValues =
  (this && this.__asyncValues) ||
  function(o) {
    if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
    var m = o[Symbol.asyncIterator],
      i;
    return m
      ? m.call(o)
      : ((o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator]()),
        (i = {}),
        verb('next'),
        verb('throw'),
        verb('return'),
        (i[Symbol.asyncIterator] = function() {
          return this;
        }),
        i);
    function verb(n) {
      i[n] =
        o[n] &&
        function(v) {
          return new Promise(function(resolve, reject) {
            (v = o[n](v)), settle(resolve, reject, v.done, v.value);
          });
        };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v) {
        resolve({ value: v, done: d });
      }, reject);
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
const lodash_1 = require('lodash');
const types_1 = require('../../types');
const Database_1 = require('../Database');
exports.CHUNK_SIZE = 100;
exports.resolveAllAsChunks = entities =>
  __awaiter(void 0, void 0, void 0, function*() {
    var e_1, _a;
    try {
      for (
        var _b = __asyncValues(lodash_1.chunk(entities, exports.CHUNK_SIZE)), _c;
        (_c = yield _b.next()), !_c.done;

      ) {
        const chunkPart = _c.value;
        yield Promise.all(chunkPart.map(entity => entity.write()));
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  });
exports.dropTables = () =>
  __awaiter(void 0, void 0, void 0, function*() {
    var e_2, _d;
    try {
      for (var _e = __asyncValues(Object.values(types_1.Table)), _f; (_f = yield _e.next()), !_f.done; ) {
        const tableName = _f.value;
        yield Database_1.DatabaseConnection.getInstance().raw(`DELETE FROM ${tableName}`);
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (_f && !_f.done && (_d = _e.return)) yield _d.call(_e);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  });
//# sourceMappingURL=index.js.map
