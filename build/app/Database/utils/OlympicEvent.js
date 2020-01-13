'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class OlympicEvent {
  constructor(athlete, event, result, sport, team, game) {
    this._athlete = athlete;
    this._event = event;
    this._result = result;
    this._sport = sport;
    this._team = team;
    this._game = game;
  }
  get athlete() {
    return this._athlete;
  }
  set athlete(value) {
    this._athlete = value;
  }
  get event() {
    return this._event;
  }
  set event(value) {
    this._event = value;
  }
  get result() {
    return this._result;
  }
  set result(value) {
    this._result = value;
  }
  get sport() {
    return this._sport;
  }
  set sport(value) {
    this._sport = value;
  }
  get team() {
    return this._team;
  }
  set team(value) {
    this._team = value;
  }
  get game() {
    return this._game;
  }
  set game(value) {
    this._game = value;
  }
}
exports.OlympicEvent = OlympicEvent;
//# sourceMappingURL=OlympicEvent.js.map
