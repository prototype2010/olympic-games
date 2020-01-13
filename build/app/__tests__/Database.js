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
Object.defineProperty(exports, '__esModule', { value: true });
require('jest');
const Database_1 = require('../Database/Database');
const utils_1 = require('../Database/utils');
const entities_1 = require('../Database/entities');
const types_1 = require('../types');
const DB = Database_1.DatabaseConnection.getInstance();
describe('Database tests', () => {
  beforeAll(() =>
    __awaiter(void 0, void 0, void 0, function*() {
      yield utils_1.dropTables();
    }),
  );
  afterAll(() =>
    __awaiter(void 0, void 0, void 0, function*() {
      yield utils_1.dropTables();
    }),
  );
  test('Athlete creates the only row', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const userRows = yield DB('athletes');
      expect(userRows.length).toBe(0);
      const athlete = new entities_1.Athlete({
        height: 100,
        name: 'Boris',
        sex: types_1.Sex.F,
        weight: 100,
        year: 1966,
      });
      athlete.teamId = 1;
      yield athlete.write();
      const userRowsAfter = yield DB('athletes');
      expect(userRowsAfter.length).toBe(1);
    }));
  test('Game creates the only row', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const gameRows = yield DB('games');
      expect(gameRows.length).toBe(0);
      const game = new entities_1.Game({ city: 'Sumy', season: types_1.Season.Summer, year: 1999 });
      yield game.write();
      const gameRowsAfter = yield DB('games');
      expect(gameRowsAfter.length).toBe(1);
    }));
  test('Sport creates the only row', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const sportRows = yield DB('sports');
      expect(sportRows.length).toBe(0);
      const sport = new entities_1.Sport({ sport: 'Smoking weed' });
      yield sport.write();
      const sportRowsAfter = yield DB('sports');
      expect(sportRowsAfter.length).toBe(1);
    }));
  test('Event creates the only row', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const eventRows = yield DB('events');
      expect(eventRows.length).toBe(0);
      const event = new entities_1.Event({ event: 'Somethis good' });
      yield event.write();
      const eventRowsAfter = yield DB('events');
      expect(eventRowsAfter.length).toBe(1);
    }));
  test('Team creates the only row', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const teamRows = yield DB('teams');
      expect(teamRows.length).toBe(0);
      const team = new entities_1.Team({ team: 'Spartak', noc: 'Uganda' });
      yield team.write();
      const teamRowsAfter = yield DB('teams');
      expect(teamRowsAfter.length).toBe(1);
    }));
  test('Result creates the only row', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const resultRows = yield DB('results');
      expect(resultRows.length).toBe(0);
      const result = new entities_1.Result({ medal: types_1.Medal.Gold });
      result.athleteId = 1;
      result.eventId = 1;
      result.sportId = 1;
      result.gameId = 1;
      yield result.write();
      const resultRowsAfter = yield DB('results');
      expect(resultRowsAfter.length).toBe(1);
    }));
  test('Athlete row matches', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const athleteParams = { height: 100, name: 'Boris', sex: types_1.Sex.F, weight: 100, year: 1966 };
      const athlete = new entities_1.Athlete(athleteParams);
      athlete.teamId = 2;
      yield athlete.write();
      const athleteRow = yield DB('athletes').where({
        year_of_birth: athleteParams.year,
        full_name: athleteParams.name,
        sex: athleteParams.sex,
        params: JSON.stringify({
          weight: athleteParams.weight,
          height: athleteParams.height,
        }),
        team_id: athlete.teamId,
      });
      expect(athleteRow.length).toBe(1);
    }));
  test('Game row matches', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const gameParams = { city: 'Bezdrik', season: types_1.Season.Summer, year: 2879 };
      const game = new entities_1.Game(gameParams);
      yield game.write();
      const gameRow = yield DB('games').where(gameParams);
      expect(gameRow.length).toBe(1);
    }));
  test('Sport  row matches', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const sportParams = { sport: 'Running in heels' };
      const sport = new entities_1.Sport(sportParams);
      yield sport.write();
      const sportRow = yield DB('sports').where({ name: sportParams.sport });
      expect(sportRow.length).toBe(1);
    }));
  test('Event row matches', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const eventParams = { event: 'Something funny' };
      const event = new entities_1.Event({ event: 'Something funny' });
      yield event.write();
      const eventRow = yield DB('events').where({ name: eventParams.event });
      expect(eventRow.length).toBe(1);
    }));
  test('Team row matches', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const teamParams = { team: 'Netherlands', noc: 'Elysium' };
      const team = new entities_1.Team(teamParams);
      yield team.write();
      const teamRow = yield DB('teams').where({
        noc_name: teamParams.noc,
        name: teamParams.team,
      });
      expect(teamRow.length).toBe(1);
    }));
  test('Result row matches', () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const resultParams = {
        athlete_id: 30,
        event_id: 30,
        sport_id: 30,
        game_id: 30,
      };
      const result = new entities_1.Result({ medal: types_1.Medal.Gold });
      result.athleteId = resultParams.athlete_id;
      result.eventId = resultParams.event_id;
      result.sportId = resultParams.sport_id;
      result.gameId = resultParams.game_id;
      yield result.write();
      const resultRow = yield DB('results').where(resultParams);
      expect(resultRow.length).toBe(1);
    }));
});
//# sourceMappingURL=Database.js.map
