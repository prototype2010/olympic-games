'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const entities_1 = require('../Database/entities');
const OlympicEvent_1 = require('../Database/utils/OlympicEvent');
const utils_1 = require('../utils');
function mapToValidDBObjects(sanitizedSCV) {
  const athletes = utils_1.getFromHashMap(new Map(), entities_1.Athlete);
  const sports = utils_1.getFromHashMap(new Map(), entities_1.Sport);
  const events = utils_1.getFromHashMap(new Map(), entities_1.Event);
  const teams = utils_1.getFromHashMap(new Map(), entities_1.Team);
  const games = utils_1.getFromHashMap(new Map(), entities_1.Game);
  const rows = sanitizedSCV.map(sanitizedCSVRow => {
    const { event, sport, noc, year, city, season, id } = sanitizedCSVRow;
    return new OlympicEvent_1.OlympicEvent(
      athletes([id], sanitizedCSVRow),
      events([event], sanitizedCSVRow),
      new entities_1.Result(sanitizedCSVRow),
      sports([sport], sanitizedCSVRow),
      teams([noc], sanitizedCSVRow),
      games([year, season, city], sanitizedCSVRow),
    );
  });
  return {
    rows,
    uniqueEntries: {
      athletes: athletes.getArray(),
      sports: sports.getArray(),
      events: events.getArray(),
      teams: teams.getArray(),
      games: games.getArray(),
    },
  };
}
exports.mapToValidDBObjects = mapToValidDBObjects;
//# sourceMappingURL=CSVRowsMapper.js.map
