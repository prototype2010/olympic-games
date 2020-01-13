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
const Database_1 = require('./app/Database/Database');
const config_1 = require('./config');
const CSVParser_1 = require('./app/CSVProcessors/CSVParser');
const path_1 = require('path');
const CSVSanitizer_1 = require('./app/CSVProcessors/CSVSanitizer');
const utils_1 = require('./app/Database/utils');
const CSVRowsMapper_1 = require('./app/CSVProcessors/CSVRowsMapper');
const SanitizerConfig_1 = require('./app/CSVProcessors/SanitizerConfig');
const lodash_1 = require('lodash');
function init() {
  var e_1, _a, e_2, _b;
  return __awaiter(this, void 0, void 0, function*() {
    const DB = Database_1.DatabaseConnection.getInstance();
    console.time('Parsing document');
    const readDocument = yield CSVParser_1.CSVParser.parse(path_1.resolve(__dirname, config_1.CSV_FILE_PATH));
    const sanitizedCSV = CSVSanitizer_1.CSVSanitizer.sanitizeArray(readDocument, SanitizerConfig_1.sanitizeConfig);
    const { rows, uniqueEntries } = CSVRowsMapper_1.mapToValidDBObjects(sanitizedCSV);
    console.timeEnd('Parsing document');
    const { teams, sports, games, events, athletes } = uniqueEntries;
    console.time('No dependency entries document');
    // drop tables
    yield utils_1.dropTables();
    yield utils_1.resolveAllAsChunks([...sports, ...events, ...games, ...teams]);
    console.timeEnd('No dependency entries document');
    console.time('Inserting results');
    rows.forEach(({ athlete, team }, index) => {
      athlete.teamId = team.id;
      athlete.id = index;
    });
    try {
      for (
        var _c = __asyncValues(lodash_1.chunk(athletes, utils_1.CHUNK_SIZE)), _d;
        (_d = yield _c.next()), !_d.done;

      ) {
        const athletesChunk = _d.value;
        yield DB('athletes').insert(
          athletesChunk.map(({ teamId, birthYear, fullName, sex, params, id }) => ({
            id,
            full_name: fullName,
            sex,
            team_id: teamId,
            params: JSON.stringify(params),
            year_of_birth: birthYear,
          })),
        );
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c.return)) yield _a.call(_c);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    try {
      for (var _e = __asyncValues(lodash_1.chunk(rows, utils_1.CHUNK_SIZE)), _f; (_f = yield _e.next()), !_f.done; ) {
        const rowsChunk = _f.value;
        yield DB('results').insert(
          rowsChunk.map(row => {
            const { result, event, sport, athlete, game } = row;
            result.gameId = game.id;
            result.athleteId = athlete.id;
            result.eventId = event.id;
            result.sportId = sport.id;
            return {
              athlete_id: result.athleteId,
              game_id: result.gameId,
              sport_id: result.sportId,
              event_id: result.eventId,
              medal: result.medal,
            };
          }),
        );
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (_f && !_f.done && (_b = _e.return)) yield _b.call(_e);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    console.timeEnd('Inserting results');
    DB.destroy(function() {
      console.log('Connection destroyed...');
    });
  });
}
init().catch(e => console.log(e));
//# sourceMappingURL=index.js.map
