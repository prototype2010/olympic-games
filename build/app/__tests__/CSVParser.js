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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('jest');
const path_1 = __importDefault(require('path'));
const CSVParser_1 = require('../CSVProcessors/CSVParser');
const parsedCSV_1 = __importDefault(require('../testUtils/testData/csv/parsedCSV'));
describe('CSV parser tests', () => {
  test('Test csv parses properly', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const parsedFile = yield CSVParser_1.CSVParser.parse(
        path_1.default.resolve(__dirname, '../testUtils/testData/csv/test.csv'),
      );
      expect(parsedFile).toEqual(parsedCSV_1.default);
    }));
});
//# sourceMappingURL=CSVParser.js.map
