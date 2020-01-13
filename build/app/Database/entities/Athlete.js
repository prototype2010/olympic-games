'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../../types');
const Model_1 = require('../utils/Model');
class Athlete extends Model_1.Model {
  constructor({ name, sex, year, weight, height }) {
    super();
    this._fullName = name;
    this._sex = sex;
    this._birthYear = year;
    const params = {};
    if (weight) {
      params.weight = weight;
    }
    if (height) {
      params.height = height;
    }
    this._params = params;
  }
  write() {
    const { fullName, sex, teamId, params, birthYear } = this;
    return super.insertToDB(Athlete.TABLE_NAME, {
      full_name: fullName,
      sex,
      team_id: teamId,
      params: JSON.stringify(params),
      year_of_birth: birthYear,
    });
  }
  get fullName() {
    return this._fullName;
  }
  set fullName(value) {
    this._fullName = value;
  }
  get sex() {
    return this._sex;
  }
  set sex(value) {
    this._sex = value;
  }
  get birthYear() {
    return this._birthYear;
  }
  set birthYear(value) {
    this._birthYear = value;
  }
  get params() {
    return this._params;
  }
  set params(value) {
    this._params = value;
  }
  get teamId() {
    return this._teamId;
  }
  set teamId(value) {
    this._teamId = value;
  }
}
exports.Athlete = Athlete;
Athlete.TABLE_NAME = types_1.Table.ATHLETES;
//# sourceMappingURL=Athlete.js.map
