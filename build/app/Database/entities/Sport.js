'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../../types');
const Model_1 = require('../utils/Model');
class Sport extends Model_1.Model {
  constructor({ sport }) {
    super();
    this.name = sport;
  }
  write() {
    return super.insertToDB(Sport.TABLE_NAME, {
      name: this.name,
    });
  }
}
exports.Sport = Sport;
Sport.TABLE_NAME = types_1.Table.SPORTS;
//# sourceMappingURL=Sport.js.map
