'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../../types');
const Model_1 = require('../utils/Model');
class Result extends Model_1.Model {
  constructor({ medal }) {
    super();
    this._medal = medal;
  }
  write() {
    const { athleteId, eventId, gameId, sportId, medal } = this;
    return super.insertToDB(Result.TABLE_NAME, {
      athlete_id: athleteId,
      game_id: gameId,
      sport_id: sportId,
      event_id: eventId,
      medal,
    });
  }
  get athleteId() {
    return this._athleteId;
  }
  set athleteId(value) {
    this._athleteId = value;
  }
  get gameId() {
    return this._gameId;
  }
  set gameId(value) {
    this._gameId = value;
  }
  get sportId() {
    return this._sportId;
  }
  set sportId(value) {
    this._sportId = value;
  }
  get eventId() {
    return this._eventId;
  }
  set eventId(value) {
    this._eventId = value;
  }
  get medal() {
    return this._medal;
  }
  set medal(value) {
    this._medal = value;
  }
}
exports.Result = Result;
Result.TABLE_NAME = types_1.Table.RESULTS;
//# sourceMappingURL=Result.js.map
