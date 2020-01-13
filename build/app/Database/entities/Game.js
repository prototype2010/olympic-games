'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../../types');
const Model_1 = require('../utils/Model');
class Game extends Model_1.Model {
  constructor({ city, year, season }) {
    super();
    this.year = year;
    this.season = season;
    this.city = city;
  }
  write() {
    const { city, season, year } = this;
    return super.insertToDB(Game.TABLE_NAME, {
      city,
      year,
      season,
    });
  }
}
exports.Game = Game;
Game.TABLE_NAME = types_1.Table.GAMES;
//# sourceMappingURL=Game.js.map
